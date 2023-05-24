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
import {
  getCartAPI,
  postBuyALLCarts,
  postToWishList,
} from "../../../services/marketService";
import { CartCard } from "./cart-card";
import { CartCardSkeleton } from "./cart-card-skeleton";
import { stringify } from 'qs';


export const MarketCart = () => {
  const navigate = useNavigate();
  const [selectedItems, setSelectedItems] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState([]);
  const [modal, setModal] = useState(false);
  const [price, setPrice] = useState();
  const [succese, setSuccese] = useState(false);
  const [cart, setCart] = useState();
  const [isLogin, setIsLogin] = useState(false);

  const handleOnClose = () => setModal(false);

  const handleCheckboxChange = (data) => {
    // Check if the selectedProduct array contains the data
    const existingIndex = selectedProduct.findIndex(item => item.productId === data.productId);
    
    if (existingIndex !== -1) {
      // Remove the data from the selectedProduct array
      const updatedSelectedProduct = [...selectedProduct];
      updatedSelectedProduct.splice(existingIndex, 1);
      setSelectedProduct(updatedSelectedProduct);
    } else {
      // Add the data to the selectedProduct array
      setSelectedProduct([...selectedProduct, data]);
    }
  };

  
  const handleClick = () => {
    const serializedData = encodeURIComponent(stringify(selectedProduct));
    navigate(`../Summary/${serializedData}`);
  };


  const handleAllCardCheckOut = () => {
    const serializedData = encodeURIComponent(stringify(cart.items));
    navigate(`../Summary/${serializedData}`);
  };


  
  const removeFromList = (index) => {
    setCart((prevCart) => ({
      ...prevCart,
      items: prevCart.items.filter((item, i) => i !== index),
      total: prevCart.total - prevCart.items[index].price,
    }));
  };

  const removeCartFromList = async (id, index) => {
    const result = await postBuyALLCarts();
    if (result === "Successful") {
      removeFromList(index);
    }
  };

  const naviagteToItem = (id) => {
    navigate(`../${id}`);
  };

  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const toWishlist = async (id, index) => {
    const result = await postToWishList(id);
    if (result === "Successful") {
      removeFromList(index);
    }
  };

  const buyOnCarts = async () => {
    const result = await postBuyALLCarts();
    if (result === "Successful") {
      //console.log(result);
      // navigate(`../`);
    }
  };

  const userOrGuest = async () => {
    const token = getToken();
    if (token === false || token === undefined) {
      setIsLogin(false);
    } else {
      setIsLogin(true);
      getCart();
    }
  };

  const getCart = async () => {
    const result = await getCartAPI();
    setCart(result);
    setPrice(result.total);
  };

  useEffect(() => {
    userOrGuest();
  }, []);

  return (
    <div>
      {isLogin && (
        <div
          className="dark:bg-adopdark bg-adoplight min-h-screen container duration-300 mx-auto"
          draggable="false"
        >
          <div className="container px-2 m-auto grid grid-cols-4 gap-4 pb-10 w-[1200px]">
            <div className="col-span-3">
              <div className="text-3xl dark:text-adoplight text-adopdark my-4">
                <b>ในตะกร้าสินค้า</b>
              </div>
              <div className="shadow-md rounded-md dark:bg-adopsoftdark">
                <div className="py-10">
                  {cart &&
                    cart.items.map((data, dataIndex) => (
                      <CartCard
                        data={data}
                        key={dataIndex}
                        toWishlist={toWishlist}
                        dataIndex={dataIndex}
                        removeCartFromList={removeCartFromList}
                        handleCheckboxChange={handleCheckboxChange}
                      />
                    ))}
                  {!cart && <CartCardSkeleton />}
                  {cart && cart.items.length === 0 && (
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
                {cart && cart.items.length !== 0 && (
                  <div>
                    <div className=" py-3">
                      {selectedProduct &&
                        selectedProduct.map((data, dataIndex) => (
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
                        <div className="text-end">{cart.discount}</div>
                      </div>
                      <div className="grid grid-cols-4 gap-1 text-lg dark:text-adoplight text-adopdark">
                        <div className="text-start col-span-3">ยอดรวม</div>
                        <div className="text-end">
                          {cart.total - cart.discount}
                        </div>
                      </div>
                    </div>
                    <div className="px-4 pb-5 pt-3">
                      <div
                        onClick={() => handleClick()}
                        className="rounded-lg bg-adoppix text-white w-full text-center py-2 text-lg cursor-pointer hover:opacity-70 duration-200"
                      >
                        ซื้อ
                      </div>
                      <div
                        onClick={() => handleAllCardCheckOut()}
                        className="rounded-lg mt-2 bg-adoppix text-white w-full text-center py-2 text-lg cursor-pointer hover:opacity-70 duration-200"
                      >
                        ซื้อทั้งหมด
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
                  </div>
                )}
                {cart && cart.items.length === 0 && (
                  <div>
                    <div className=" px-8 py-5 place-items-center text-center">
                      ยังไม่มีสินค้าในตะกร้าสินค้า{" "}
                      <div
                        onClick={() => navigate(`../`)}
                        className="text-adoppix mt-2 hover:opacity-75 cursor-pointer"
                      >
                        ค้นหาสินค้า?
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
      {!isLogin && (
        <div
          className="dark:bg-adopdark bg-adoplight min-h-screen container duration-300 mx-auto"
          draggable="false"
        >
          <div className="container px-2 m-auto grid grid-cols-4 gap-4 pb-10 w-[1200px]">
            <div className="col-span-3">
              <div className="text-3xl dark:text-adoplight text-adopdark my-4">
                <b>ในตะกร้าสินค้า</b>
              </div>
              <div className="shadow-md rounded-md dark:bg-adopsoftdark">
                <div className="py-10">
                  <div className="px-8 py-5 place-items-center text-center">
                    กรุณาเข้าสู่ระบบเพื่อดูสินค้าในตะกร้าสินค้า{" "}
                    <div
                      onClick={() => navigate(`/login`)}
                      className="text-adoppix mt-2 hover:opacity-75 cursor-pointer"
                    >
                      เข้าสู่ระบบ
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="">
              <div className="text-3xl dark:text-adoplight text-adopdark my-4">
                <b>สรุปการชำระเงิน</b>
              </div>
              <div className="shadow-md rounded-md dark:bg-adopsoftdark">
                <div className="py-3 px-5">
                  <div className="grid grid-cols-4 gap-1 text-lg text-red-400">
                    <div className="text-start col-span-3">ส่วนลด</div>
                    <div className="text-end">0</div>
                  </div>
                  <div className="grid grid-cols-4 gap-1 text-lg dark:text-adoplight text-adopdark">
                    <div className="text-start col-span-3">ยอดรวม</div>
                    <div className="text-end">0</div>
                  </div>
                </div>
                <div className="px-4 pb-5 pt-3">
                  <div
                    onClick={() => navigate(`/login`)}
                    className="rounded-lg bg-adoppix text-white w-full text-center py-2 text-lg cursor-pointer hover:opacity-70 duration-200"
                  >
                    ซื้อ
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {modal && (
        <ConfirmModal
          onClose={handleOnClose}
          removeCartFromList={removeCartFromList}
          setModal={setModal}
          selectedProduct={selectedProduct}
          setSelectedProduct={setSelectedProduct}
          selectedItems={selectedItems}
          setCart={setCart}
          setPrice={setPrice}
          buyOnCarts={buyOnCarts}
        />
      )}
    </div>
  );
};

