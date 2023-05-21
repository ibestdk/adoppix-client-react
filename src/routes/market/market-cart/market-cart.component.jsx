import { GoVerified } from "react-icons/go";
import { FaTrash } from "react-icons/fa";
import { AiFillStar } from "react-icons/ai";
import { getToken } from "../../../services/authorize";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AiOutlineShoppingCart } from "react-icons/ai";
import ConfirmModal from "../../../components/market/market-modal/confirm-modal";
import SuccesefullBuy from "../../../components/market/market-modal/succesefull-buy";
import { getCartAPI } from "../../../services/marketService";
import { CartCard } from "./cart-card";
import { CartCardSkeleton } from "./cart-card-skeleton";

export const MarketCart = () => {
  const navigate = useNavigate();

  const [modal, setModal] = useState(false);
  const handleOnClose = () => setModal(false);
  const [price, setPrice] = useState();
  const [succese, setSuccese] = useState(false);

  const navigateToWishList = () => {
    navigate(`../wishlist`);
  };

  const navigateToCart = () => {
    navigate(`../`);
  };

  const [cart, setCart] = useState();
  const getCart = async () => {
    const result = await getCartAPI();
    setCart(result);
    setPrice(result.total);
  };

  const removeFromList = function (index) {
    setCart({
      discount: cart.discount,
      items: cart.items.filter((item, i) => i != index),
      total: cart.total - cart.items[index].price,
    });
    console.log(cart.total);
  };

  const removeCartFromList = function (id, index) {
    const token = getToken();
    const headers = {
      Authorization: `Bearer ${token}`,
      "Access-Control-Allow-Origin": "*",
    };

    axios
      .post(`https://api.adoppix.com/api/Product/${id}/toggle-cart`, {
        headers,
      })
      .then((res) => {
        removeFromList(index);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const toWishlist = (id, index) => {
    console.log(id);
    const token = getToken();
    const headers = {
      Authorization: `Bearer ${token}`,
      "Access-Control-Allow-Origin": "*",
    };

    axios({
      method: "patch",
      url: `https://api.adoppix.com/api/Product/${id}/wishlist`,
      headers: headers,
    })
      .then((res) => {
        console.log(res);
        removeFromList(index);
      })
      .catch((err) => console.log(err));
  };

  const naviagteToItem = function (id) {
    navigate(`../${id}`);
  };

  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const buyOnCarts = function () {
    const token = getToken();
    const headers = {
      Authorization: `Bearer ${token}`,
      "Access-Control-Allow-Origin": "*",
    };

    axios
      .post(`https://api.adoppix.com/api/Product/buys`, { headers })
      .then(async (res) => {
        setModal(false);
        setSuccese(true);
        await delay(3000);
        navigate(`../`);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const [isLogin, setIsLogin] = useState(false);
  const userOrGuest = async () => {
    const token = getToken();
    if (token === false || token === undefined) {
      setIsLogin(false);
    } else {
      setIsLogin(true);
      getCart();
    }
  };

  useEffect(() => {
    userOrGuest();
  }, []);

  return (
    <div>
      {isLogin == true && (
        <div
          className="dark:bg-adopdark bg-adoplight min-h-screen"
          draggable="false"
        >
         
          <div className="container px-14 m-auto grid grid-cols-4 gap-4 pb-10">
            <div className="col-span-3">
              <div className="text-3xl dark:text-adoplight text-adopdark my-4">
                <b>ในตะกร้าสินค้า</b>
              </div>
              <div className="shadow-md rounded-md dark:bg-adopsoftdark">
                <div className="py-10">
                  {cart &&
                    cart.items.map((data, dataIndex) => (
                      <CartCard data={data}  key={dataIndex}/>
                    ))}
                  {!cart && (
                   <CartCardSkeleton/>
                  )}
                  {cart && cart.items.length == 0 && (
                    <div className="px-8 py-5 place-items-center text-center">
                      ยังไม่มีสินค้าในตะกร้าสินค้า{" "}
                      <div
                        onClick={() => navigate(`../`)}
                        className="text-adoppix mt-2 hover:opacity-75 cursor-pointer"
                      >
                        ค้นหาสินค้า?
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="">
              <div className="text-3xl dark:text-adoplight text-adopdark my-4">
                <b>สรุปการชำระเงิน</b>
              </div>
              <div className="shadow-md rounded-md dark:bg-adopsoftdark">
                {cart && cart.items.length != 0 && (
                  <div>
                    <div className=" py-3">
                      {cart &&
                        cart.items.map((data, dataIndex) => (
                          <div
                            key={dataIndex}
                            className="grid grid-cols-4 gap-1 text-lg pb-2 px-5  dark:text-adoplight text-adopdark"
                          >
                            <div className="col-span-3 truncate">
                              {data.title}
                            </div>
                            <div className="text-end">{data.price}</div>
                          </div>
                        ))}
                    </div>
                    <hr className="mx-5 text-adoplighticon" />
                    <div className="py-3 px-5">
                      <div className="grid grid-cols-4 gap-1 text-lg text-red-400">
                        <div className="text-start col-span-3">ส่วนลด</div>
                        <div className="text-end">{cart && cart.discount}</div>
                      </div>
                      <div className="grid grid-cols-4 gap-1 text-lg dark:text-adoplight text-adopdark">
                        <div className="text-start col-span-3">ยอดรวม</div>
                        <div className="text-end">
                          {cart && cart.total - cart.discount}
                        </div>
                      </div>
                    </div>
                    <div className="px-4 pb-5 pt-3">
                      <div
                        onClick={() => setModal(true)}
                        className="text-center text-adoplight text-lg py-1 px-20 w-fit rounded-md bg-adoppix m-auto hover:bg-blue-500 hover:scale-105 duration-300 cursor-pointer"
                      >
                        <b>ซื้อสินค้าในตะกร้า</b>
                      </div>
                    </div>
                    <div className="shadow-md rounded-md dark:bg-adopsoftdark">
                      <div className="text-2xl dark:text-adoplight text-adopdark my-4 pt-5 pb-2 px-8">
                        <b>โค้ดส่วนลด</b>
                      </div>
                      <div className="grid grid-cols-3 px-4 pb-3">
                        <div className="col-span-2">
                          <input
                            className="text-adopsoftdark rounded-md w-fit shadow-md"
                            type="text"
                            name=""
                            id=""
                          />
                        </div>
                        <div className="pb-3">
                          <div className="text-center text-adoplight text-sm w-fit px-1 py-2 rounded-md bg-adoppix m-auto hover:bg-blue-500 hover:scale-105 duration-300 cursor-pointer">
                            <b>ใช้รหัสส่วนลด</b>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                {!cart && (
                  <div>
                    <div className=" py-3">
                      <div className="grid grid-cols-4 gap-2 pb-2 px-5 animate-pulse">
                        <div className="col-span-3 h-7 w-full dark:bg-adopdark bg-adoplighticon rounded-md"></div>
                        <div className="h-7 w-full dark:bg-adopdark bg-adoplighticon rounded-md"></div>
                        <div className="col-span-3 h-7 w-full dark:bg-adopdark bg-adoplighticon rounded-md"></div>
                        <div className="h-7 w-full dark:bg-adopdark bg-adoplighticon rounded-md"></div>
                        <div className="col-span-3 h-7 w-full dark:bg-adopdark bg-adoplighticon rounded-md"></div>
                        <div className="h-7 w-full dark:bg-adopdark bg-adoplighticon rounded-md"></div>
                      </div>
                    </div>
                    <hr className="mx-5 text-adoplighticon" />
                    <div className="py-3 px-5">
                      <div className="grid grid-cols-4 gap-1 mb-2 text-lg text-red-400">
                        <div className="text-start col-span-3">ส่วนลด</div>
                        <div className="h-7 w-full dark:bg-adopdark bg-adoplighticon rounded-md animate-pulse"></div>
                      </div>
                      <div className="grid grid-cols-4 gap-1 text-lg dark:text-adoplight text-adopdark">
                        <div className="text-start col-span-3">ยอดรวม</div>
                        <div className="h-7 w-full dark:bg-adopdark bg-adoplighticon rounded-md animate-pulse"></div>
                      </div>
                    </div>
                    <div className="px-4 pb-5 pt-3">
                      <div className="text-center text-adoplight text-lg py-1 px-20 w-fit rounded-md bg-adoppix m-auto">
                        <b>ซื้อสินค้าในตะกร้า</b>
                      </div>
                    </div>
                    <div className="shadow-md rounded-md dark:bg-adopsoftdark">
                      <div className="text-2xl dark:text-adoplight text-adopdark my-4 pt-5 pb-2 px-8">
                        <b>โค้ดส่วนลด</b>
                      </div>
                      <div className="grid grid-cols-3 px-4 pb-3">
                        <div className="col-span-2 animate-pulse">
                          <div className="h-10 w-full dark:bg-adopdark bg-adoplighticon rounded-md"></div>
                        </div>
                        <div className="pb-3">
                          <div className="text-center text-adoplight text-sm w-fit px-1 py-2 rounded-md bg-adoppix m-auto">
                            <b>ใช้รหัสส่วนลด</b>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                {cart && cart.items.length == 0 && (
                  <div className="text-center place-items-center p-[76px]">
                    ไม่มีสินค้า
                  </div>
                )}
              </div>
            </div>
          </div>
          <SuccesefullBuy visible={succese} />
          <ConfirmModal
            onClose={handleOnClose}
            visible={modal}
            price={price}
            method={buyOnCarts}
          />
        </div>
      )}
      {isLogin == false && (
        <div className="w-full dark:bg-adopdark bg-adoplight min-h-screen content-center grid">
          <h2 className="dark:text-adoplight text-adopdark text-3xl p-2 text-center">
            โปรดลงชื่อเข้าใช้ก่อนทำรายการ
            <div
              onClick={() => navigate("../../login")}
              className="text-adoppix text-xl mt-2 hover:opacity-75 cursor-pointer w-fit text-center m-auto"
            >
              ไปลงชื่อเข้าใช้งาน?
            </div>
            <div
              onClick={() => navigate("../../signup")}
              className="text-adoppix text-xl mt-2 hover:opacity-75 cursor-pointer w-fit text-center m-auto"
            >
              ไปลงทะเบียนเข้าใช้งาน?
            </div>
          </h2>
        </div>
      )}
    </div>
  );
};
