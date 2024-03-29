import Skeleton from "@mui/material/Skeleton";
import { IoMdMore } from "react-icons/io";
import { AiOutlineStar } from "react-icons/ai";
import { AiFillStar } from "react-icons/ai";
import ReactWaterMark from "react-watermark-component";
import { useParams } from "react-router-dom";
import { GiTwoCoins } from "react-icons/gi";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { useState, useEffect } from "react";
import axios from "axios";
import { getToken } from "../../../services/authorize";
import { useNavigate, NavLink } from "react-router-dom";
import { BsCartCheck } from "react-icons/bs";
import { BsCartPlus } from "react-icons/bs";
import ConfirmModal from "../../../components/market/market-modal/confirm-modal";
import SuccesefullBuy from "../../../components/market/market-modal/succesefull-buy";
import LoginFirst from "../../../components/market/market-modal/login-first-modal";
import { stringify } from "qs";
import { WishList } from "../market-index/like/wishlist";
import { CartList } from "../market-index/like copy/cart";
import { getAPIBalance } from "../../../services/userService";
import MoneyNumber from "../../../services/moneyService";

export const MarketItem = () => {
  const { productId } = useParams();
  const navigate = useNavigate();

  const [i, setI] = useState(0);
  const [balance, setBalance] = useState();
  const getBalance = async () => {
    const result = await getAPIBalance();
    setBalance(result);
  };

  useEffect(() => {
    userOrGuest();
  }, []);

  const [modal, setModal] = useState(false);
  const handleOnClose = () => setModal(false);
  const [price, setPrice] = useState();
  const [succese, setSuccese] = useState(false);

  const [wishlistState, setWishlistState] = useState(false);
  const wishlistClicked = () => {
    if (!wishlistState && cartState) {
      setCartState(false);
    }
    setWishlistState(!wishlistState);
    wishList();
    setI(i + 1);
  };

  const handleClick = () => {
    const serializedData = encodeURIComponent(stringify(productDatas));
    navigate(`../Summary/${serializedData}`);
  };

  const [cartState, setCartState] = useState(false);
  const addCartClicked = () => {
    if (!cartState && wishlistState) {
      setWishlistState(false);
    }
    setCartState(!cartState);
    cart();
    setI(i + 1);
  };

  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const beginAlarm = function () {
    //console.log("start alarm");
  };
  const options = {
    chunkWidth: 200,
    chunkHeight: 60,
    textAlign: "left",
    textBaseline: "bottom",
    globalAlpha: 1,
    font: "14px Microsoft Yahei",
    rotateAngle: -0.26,
    fillStyle: "#1f1f1f",
  };

  const [productDatas, setProductData] = useState();
  const [ownerDatas, setOwnerData] = useState();

  const [menuState, setMenuState] = useState(false);
  const menuClicked = () => {
    setMenuState(!menuState);
  };

  const ownerData = (username) => {
    axios
      .get(`https://api.adoppix.com/api/User/${username}/user-info`)
      .then((res) => {
        //console.log("Owner data : ", res.data.data);
        setOwnerData(res.data.data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const waterMark = `${productDatas && productDatas.ownerUsername}`;
  const getProduct = () => {
    axios
      .get(`https://api.adoppix.com/api/Product/${productId}`)
      .then((res) => {
        //console.log("Success:", res.data.data);
        setProductData(res.data.data);
        setPrice(res.data.data.price);
        //console.log("owner " + res.data.data.ownerUsername);
        ownerData(res.data.data.ownerUsername);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const deleteProduct = async () => {
    const token = getToken();
    const headers = {
      Authorization: `Bearer ${token}`,
      "Access-Control-Allow-Origin": "*",
    };

    // API Caller
    axios
      .delete(`https://api.adoppix.com/api/Product/${productId}`, { headers })
      .then(() => navigate(`../`))
      .catch((err) => console.log(err.response));
    //console.log("productId : " + productId);
  };

  const wishList = async () => {
    const token = getToken();
    const headers = {
      Authorization: `Bearer ${token}`,
      "Access-Control-Allow-Origin": "*",
    };

    // API Caller
    axios({
      method: "patch",
      url: `https://api.adoppix.com/api/Product/${productId}/wishlist`,
      headers: headers,
    })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
    // axios.patch(`https://api.adoppix.com/api/Product/${productId}/wishlist`)
    // .then((res) => //console.log(res))
    // .catch((err) => console.log(err.response));
  };

  const buy = async () => {
    const token = getToken();
    const headers = {
      Authorization: `Bearer ${token}`,
      "Access-Control-Allow-Origin": "*",
    };

    // API Caller
    axios({
      method: "post",
      url: `https://api.adoppix.com/api/Product/${productId}/buy`,
      headers: headers,
    })
      .then(async (res) => {
        setModal(false);
        setSuccese(true);
        await delay(3000);
        navigate(`../`);
      })
      .catch((err) => console.log(err));
    // axios.patch(`https://api.adoppix.com/api/Product/${productId}/wishlist`)
    // .then((res) => //console.log(res))
    // .catch((err) => console.log(err.response));
  };

  const cart = async () => {
    const token = getToken();
    const headers = {
      Authorization: `Bearer ${token}`,
      "Access-Control-Allow-Origin": "*",
    };

    // API Caller
    axios({
      method: "post",
      url: `https://api.adoppix.com/api/Product/${productId}/toggle-cart`,
      headers: headers,
    })
      .then((res) => console.log("cart : " + res.data.data))
      .catch((err) => console.log(err));
  };

  var BreakException = {};
  const searchIsCarted = function (data, index) {
    if (data.productId == productId) {
      setCartState(true);
      throw BreakException;
    } else if (data.productId != productId) {
      setCartState(false);
    }
  };

  const searchIsWishListed = function (data, index) {
    if (data.productId == productId) {
      setWishlistState(true);
      throw BreakException;
    } else if (data.productId != productId) {
      setWishlistState(false);
    }
  };

  const checkIsCarted = () => {
    const token = getToken();
    const headers = {
      Authorization: `Bearer ${token}`,
      "Access-Control-Allow-Origin": "*",
    };

    axios
      .get(`https://api.adoppix.com/api/User/cart`, { headers })
      .then((res) => {
        //console.log("cart :", res.data.data);
        res.data.data.items.forEach(searchIsCarted);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const checkIsWishListed = () => {
    const token = getToken();
    const headers = {
      Authorization: `Bearer ${token}`,
      "Access-Control-Allow-Origin": "*",
    };

    axios
      .get(`https://api.adoppix.com/api/User/wishlist`, { headers })
      .then((res) => {
        //console.log("wishlist :", res.data.data);
        res.data.data.forEach(searchIsWishListed);
        //console.log("wishlist State : " + wishlistState);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const [loginWarning, setLoginWarning] = useState(false);
  const handleOnCloseModal2 = () => setLoginWarning(false);
  const [isLogin, setIsLogin] = useState(false);
  const userOrGuest = async () => {
    const token = getToken();
    if (token === false || token === undefined) {
      setIsLogin(false);
      getProduct();
    } else {
      getBalance();
      setIsLogin(true);
      getProduct();
      checkIsWishListed();
      checkIsCarted();
    }
  };

  useEffect(() => {
    userOrGuest();
  }, [productId]);

  return (
    <div
      className="dark:bg-adopdark bg-adoplight min-h-screen pt--10 "
      draggable="false"
    >
      <div className="sticky top-8 pt-10 z-20">
        <div className="flex mr-10 justify-end items-end space-x-4">
          <WishList istate={i} />
          <CartList istate={i} />
        </div>{" "}
        <div className="text-adoppix duration-300 justify-end mr-10 pt-4 flex items-center space-x-2">
          {balance && (
            <div className=" bg-adopsoftdark rounded-lg p-2 flex space-x-2">
              <MoneyNumber amount={balance} />
              <GiTwoCoins />
              <AiOutlinePlusCircle
                onClick={() => navigate("../topup")}
                className="  text-white"
              />
            </div>
          )}
        </div>
      </div>
      {productDatas && isLogin == true && (
        <div className="relative">
          <div className="container m-auto  w-[900px]">
            <div className="p-5 dark:bg-adopsoftdark shadow-md rounded-lg mb-14">
              {productDatas && (
                <div>
                  <div>
                    <ReactWaterMark
                      waterMarkText={waterMark}
                      openSecurityDefense
                      securityAlarm={beginAlarm}
                      options={options}
                    >
                      <div className="relative">
                        <div>
                          <img
                            draggable={false}
                            className="h-[500px] object-cover w-full m-auto inline-flex rounded-lg shadow-lg blur-sm brightness-75"
                            src={`https://pix.adoppix.com/public/${productDatas.images[0]}`}
                            alt=""
                          />
                        </div>
                        <div className="absolute top-0 m-auto left-0 right-0 ">
                          <p className="text-center">
                            <img
                              draggable={false}
                              className="h-[500px] m-atuo inline-flex rounded-lg shadow-lg"
                              src={`https://pix.adoppix.com/public/${productDatas.images[0]}`}
                              onDragStart={(event) => event.preventDefault()}
                              alt=""
                            />
                          </p>
                        </div>
                      </div>
                    </ReactWaterMark>
                  </div>
                  {productDatas && productDatas.images.length > 1 && (
                    <div className="my-4">
                      <div className="min-w-[100px] max-h-fit h-fit object-cover w-full m-auto inline-flex rounded-lg justify-center border border-solid border-adoplighticon">
                        <div className="  my-3 flex space-x-2">
                          {productDatas.images.map((image, index) => (
                            <div
                              key={index}
                              className="image-item w-full rounded-md m-0 flex flex-wrap"
                            >
                              <img
                                className="h-[100px] w-[100px] rounded-md object-cover overflow-hidden"
                                src={`https://pix.adoppix.com/public/${image}`}
                                alt=""
                                width="100"
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
              {productDatas && (
                <div>
                  <div className="mt-4 grid grid-cols-12 w-full max-w-4xl rounded-md">
                    <div className="text-3xl pb-5 w-3xl break-words text-ellipsis col-span-11 dark:text-adoplight text-adopsoftdark">
                      {productDatas.title}
                    </div>
                    {productDatas.isOwner && (
                      <div className="relative">
                        {!menuState && (
                          <IoMdMore
                            onClick={menuClicked}
                            className="text-3xl absolute top-0 right-2 dark:text-adoplight text-adopsoftdark hover:scale-105 hover:bg-adoplighticon duration-300 rounded-full h-10 w-10"
                          ></IoMdMore>
                        )}
                        {menuState && (
                          <IoMdMore
                            onClick={menuClicked}
                            className="text-3xl absolute top-0 right-2 dark:text-adoplight text-adopsoftdark bg-adoplighticon rounded-l-md h-10 w-10"
                          ></IoMdMore>
                        )}
                        {menuState && (
                          <div className="bg-adoplighticon p-1 rounded-md left-16 absolute">
                            <div
                              onClick={deleteProduct}
                              className="text-adoplight text-base text-left p-1 rounded-md hover:bg-red-500 duration-300 cursor-pointer"
                            >
                              Delete
                            </div>
                            <NavLink
                              className="text-adoplight text-base text-left p-1 rounded-md hover:bg-yellow-300 duration-300 cursor-pointer"
                              to={`../my-shop/${productDatas.productId}`}
                            >
                              แก้ไข
                            </NavLink>
                            {/* report โผล่มาในกรณีที่ไม่ใช่ creater เท่านั้น */}
                            <div className="text-adoplight text-base text-left p-1 rounded-md hover:bg-yellow-300 duration-300 cursor-pointer">
                              รายงาน
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                  <div className="w-full max-w-4xl rounded-md flex justify-between ">
                    <div className="relative">
                      <div className="dark:text-adoplight text-adopsoftdark leading-6 text-sm">
                        {productDatas.description}
                      </div>
                      <div className="mt-3">
                        {productDatas.tags.map((data, dataIndex) => (
                          <div
                            key={dataIndex}
                            className="dark:text-adoplight text-adopsoftdark text-center inline-block cursor-default mr-2 text-lg"
                          >
                            {`#` + data}
                          </div>
                        ))}
                      </div>
                      <div className="my-5 cursor-default">
                        <div className="text-xl my-3 dark:text-adoplight text-adopsoftdark">
                          <b>ศิลปิน</b>
                        </div>
                        <div className="pl-3">
                          <div className="bg-adopdark rounded-lg p-3 w-[220px] flex justify-start items-center">
                            {productDatas.ownerProfileImage != null && (
                              <img
                                className="rounded-full outline outline-2 outline-offset-2 outline-adoppix dark:outline-adoplight inline-block h-[35px] w-[35px]"
                                src={`https://pix.adoppix.com/public/${
                                  productDatas.ownerProfileImage
                                    ? productDatas.ownerProfileImage
                                    : "adop.png"
                                }`}
                                alt=""
                                draggable="false"
                              />
                            )}
                            {productDatas.ownerProfileImage == null && (
                              <img
                                className="rounded-full outline outline-2 outline-offset-2 outline-adoppix dark:outline-adoplight inline-block h-[35px] w-[35px]"
                                src={`https://inspireddentalcare.co.uk/wp-content/uploads/2016/05/Facebook-default-no-profile-pic.jpg`}
                                alt=""
                                draggable="false"
                              />
                            )}
                            <div
                              onClick={() => {
                                navigate(`../../${productDatas.ownerUsername}`);
                              }}
                              className="inline-block pl-5 max-w-md dark:text-adoplight text-adopsoftdark cursor-pointer hover:opacity-75"
                            >
                              <b className="text-lg">
                                {productDatas.ownerUsername}
                              </b>
                            </div>
                            <div className="inline-block bg-adoppix text-adoplight hover:bg-blue-500 duration-300 rounded-2xl py-1 px-3 text-xs ml-4 cursor-pointer">
                              <b>Follow</b>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="pl-6 cursor-default">
                      <div className="flex items-end">
                        <b className="mr-10 inline-block text-2xl dark:text-adoplight text-adopsoftdark">
                          ราคา
                        </b>
                        <b className="inline-block text-4xl text-right text-adoppix w-full">
                          <MoneyNumber amount={productDatas.price} />
                        </b>
                      </div>
                      <div className="flex justify-between">
                        <div className="pr-2">
                          <b className="text-lg dark:text-adoplight text-adopsoftdark">
                            ประเภทสินค้า
                          </b>
                          {productDatas.typeId == 1 && (
                            <p className="text-xs text-end text-adoppix">
                              รูปภาพ
                            </p>
                          )}
                          {productDatas.typeId == 2 && (
                            <p className="text-xs text-end text-adoppix">
                              สติ้กเกอร์
                            </p>
                          )}
                        </div>
                        <div className="pr-2">
                          <b className="text-lg dark:text-adoplight text-adopsoftdark">
                            จำนวนที่เหลือ
                          </b>
                          {productDatas.amount == null && (
                            <p className="text-xs text-end text-adoppix">
                              ไม่จำกัด
                            </p>
                          )}
                          {productDatas.amount > 0 && (
                            <p className="text-xs text-end text-adoppix">
                              {productDatas.amount + " ชิ้น"}
                            </p>
                          )}
                        </div>
                      </div>
                      <div className="mt-2">
                        {productDatas.canCommercial && (
                          <p className="text-xs text-green-400 text-end">
                            สามารถใช้ในเชิงพาณิชย์ได้
                          </p>
                        )}
                        {!productDatas.canCommercial && (
                          <p className="text-xs text-red-400 text-end">
                            ไม่สามารถใช้ในเชิงพาณิชย์ได้
                          </p>
                        )}
                      </div>
                      {!productDatas.isBought && (
                        <div className=" mt-2 flex justify-center items-center space-x-2">
                          <div
                            onClick={handleClick}
                            className="text-lg px-16 py-2 bg-adoppix rounded-md text-adoplight text-center cursor-pointer hover:opacity-80  duration-300"
                          >
                            ซื้อ
                          </div>
                          <div className=" cursor-pointer">
                            {wishlistState == false && (
                              <div className="p-2 rounded-lg border-2 dark:border-[#ACACAC] border-adoppix hover:border-adoppix">
                                <AiOutlineStar
                                  onClick={wishlistClicked}
                                  className=" text-[#ACACAC]  duration-300"
                                />
                              </div>
                            )}
                            {wishlistState == true && (
                              <div className="p-2 rounded-lg border-2 dark:border-[#ACACAC] border-adoppix hover:border-adoppix">
                                <AiFillStar
                                  onClick={wishlistClicked}
                                  className=" text-yellow-300 duration-300"
                                />
                              </div>
                            )}
                          </div>
                          <div className="cursor-pointer">
                            {cartState == false && (
                              <div className="p-2 rounded-lg border-2 dark:border-[#ACACAC] border-adoppix hover:border-adoppix">
                                <BsCartPlus
                                  onClick={addCartClicked}
                                  className=" text-[#ACACAC] duration-300"
                                />
                              </div>
                            )}
                            {cartState == true && (
                              <div className="p-2 rounded-lg border-2 dark:border-[#ACACAC] border-adoppix hover:border-adoppix">
                                <BsCartCheck
                                  onClick={addCartClicked}
                                  className=" text-green-400 duration-300"
                                />
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                      {productDatas.isBought && (
                        <div className="grid grid-cols-6 mt-2 gap-2">
                          <div className="relative col-span-5 row-span-2 bg-adoplighticon rounded-md text-adopsoftdark text-center py-1">
                            <b className="absolute top-[30%] left-[27%]">
                              ซื้อแล้ว
                            </b>
                          </div>
                          <div className="">
                            <AiOutlineStar className="h-8 w-8 p-1 border dark:border-white border-adoplighticon rounded-md text-adoplighticon dark:text-adoplight" />
                          </div>
                          <div className="">
                            <BsCartPlus className="h-8 w-8 p-1 border dark:border-white border-adoplighticon rounded-md text-adoplighticon dark:text-adoplight" />
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
      {productDatas && isLogin == false && (
        <div className="relative">
          <div className="container m-auto grid grid-cols-1 gap-4 place-items-center">
            <div className="p-5 dark:bg-adopsoftdark shadow-md rounded-lg mb-14">
              {productDatas && (
                <div>
                  <div>
                    <ReactWaterMark
                      waterMarkText={waterMark}
                      openSecurityDefense
                      securityAlarm={beginAlarm}
                      options={options}
                    >
                      <div className="relative">
                        <div>
                          <img
                            draggable={false}
                            className="h-[500px] object-cover w-full m-auto inline-flex rounded-lg shadow-lg blur-sm brightness-75"
                            src={`https://pix.adoppix.com/public/${productDatas.images[0]}`}
                            alt=""
                          />
                        </div>
                        <div className="absolute top-0 m-auto left-0 right-0 ">
                          <p className="text-center">
                            <img
                              draggable={false}
                              className="h-[500px] m-atuo inline-flex rounded-lg shadow-lg"
                              src={`https://pix.adoppix.com/public/${productDatas.images[0]}`}
                              onDragStart={(event) => event.preventDefault()}
                              alt=""
                            />
                          </p>
                        </div>
                      </div>
                    </ReactWaterMark>
                  </div>
                  {productDatas && productDatas.images.length > 1 && (
                    <div className="my-4">
                      <div className="min-w-[240px] max-h-fit h-fit object-cover w-full m-auto inline-flex rounded-lg justify-center border border-solid border-adoplighticon">
                        <div className="grid grid-cols-3 gap-4 my-3">
                          {productDatas.images.map((image, index) => (
                            <div
                              key={index}
                              className="image-item w-full rounded-md m-0"
                            >
                              <img
                                className="h-[240px] w-[240px] rounded-md object-cover overflow-hidden"
                                src={`https://pix.adoppix.com/public/${image}`}
                                alt=""
                                width="100"
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
              {productDatas && (
                <div>
                  <div className="mt-4 grid grid-cols-12 w-full max-w-4xl rounded-md">
                    <div className="text-3xl pb-5 w-3xl break-words text-ellipsis col-span-11 dark:text-adoplight text-adopsoftdark">
                      {productDatas.title}
                    </div>
                  </div>
                  <div className="w-full max-w-4xl rounded-md grid grid-cols-4 gap-4">
                    <div className="col-span-3">
                      <div className="dark:text-adoplight text-adopsoftdark leading-6 text-sm">
                        {productDatas.description}
                      </div>
                      <div className="mt-3">
                        {productDatas.tags.map((data, dataIndex) => (
                          <div
                            key={dataIndex}
                            className="dark:text-adoplight text-adopsoftdark text-center inline-block cursor-default mr-2 text-lg"
                          >
                            {`#` + data}
                          </div>
                        ))}
                      </div>
                      <div className="my-5 cursor-default">
                        <div className="text-xl my-3 dark:text-adoplight text-adopsoftdark">
                          <b>ศิลปิน</b>
                        </div>
                        <div className="pl-3">
                          {productDatas.ownerProfileImage != null && (
                            <img
                              className="rounded-full outline outline-2 outline-offset-2 outline-adoppix dark:outline-adoplight inline-block h-10 w-10"
                              src={`https://pix.adoppix.com/public/${productDatas.ownerProfileImage}`}
                              alt=""
                              draggable="false"
                            />
                          )}
                          {productDatas.ownerProfileImage == null && (
                            <img
                              className="rounded-full outline outline-2 outline-offset-2 outline-adoppix dark:outline-adoplight inline-block h-10 w-10"
                              src={`https://inspireddentalcare.co.uk/wp-content/uploads/2016/05/Facebook-default-no-profile-pic.jpg`}
                              alt=""
                              draggable="false"
                            />
                          )}
                          <div
                            onClick={() => {
                              navigate(`../../${productDatas.ownerUsername}`);
                            }}
                            className="inline-block pl-5 max-w-md dark:text-adoplight text-adopsoftdark cursor-pointer hover:opacity-75"
                          >
                            <b className="">{productDatas.ownerUsername}</b>
                          </div>
                          <div className="inline-block bg-adoppix text-adoplight hover:bg-blue-500 duration-300 rounded-2xl py-1 px-3 text-xs ml-4 cursor-pointer">
                            <b>Follow</b>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="pl-6 cursor-default">
                      <div className="flex">
                        <b className="mr-10 inline-block text-xl dark:text-adoplight text-adopsoftdark">
                          ราคา
                        </b>
                        <b className="inline-block text-4xl text-right text-adoppix w-full">
                          <MoneyNumber amount={productDatas.price} />
                        </b>
                      </div>
                      <div className="flex justify-end items-end mt-1">
                        <div className="pr-2 flex">
                          <div>
                            <b className="text-sm text-end dark:text-adoplight text-adopsoftdark">
                              ประเภทสินค้า
                            </b>
                          </div>
                          <div>
                            {productDatas.typeId == 1 && (
                              <p className="text-xs text-end text-adoppix">
                                รูปภาพ
                              </p>
                            )}
                            {productDatas.typeId == 2 && (
                              <p className="text-xs text-end text-adoppix">
                                สติ้กเกอร์
                              </p>
                            )}
                          </div>
                        </div>
                        <div className="pr-2">
                          <b className="text-sm text-end dark:text-adoplight text-adopsoftdark">
                            จำนวนที่เหลือ
                          </b>
                          {productDatas.amount == null && (
                            <p className="text-xs text-end text-adoppix">
                              ไม่จำกัด
                            </p>
                          )}
                          {productDatas.amount > 0 && (
                            <p className="text-xs text-end text-adoppix">
                              {productDatas.amount + " ชิ้น"}
                            </p>
                          )}
                        </div>
                      </div>
                      <div className="mt-2">
                        {productDatas.canCommercial && (
                          <p className="text-xs text-green-400 text-end">
                            สามารถใช้ในเชิงพาณิชย์ได้
                          </p>
                        )}
                        {!productDatas.canCommercial && (
                          <p className="text-xs text-red-400 text-end">
                            ไม่สามารถใช้ในเชิงพาณิชย์ได้
                          </p>
                        )}
                      </div>
                      <div className="grid grid-cols-6 mt-2 gap-2">
                        <div
                          onClick={() => setLoginWarning(true)}
                          className="relative col-span-5 row-span-2 bg-adoppix rounded-md text-adoplight text-center py-1 cursor-pointer hover:bg-blue-500 duration-300"
                        >
                          <b className="absolute top-[30%] left-[40%]">ซื้อ</b>
                        </div>
                        <div className=" cursor-pointer">
                          <AiFillStar
                            onClick={() => setLoginWarning(true)}
                            className="h-8 w-8 p-1 border dark:border-white border-adoppix hover:border-adoppix rounded-md text-yellow-300 duration-300"
                          />
                        </div>
                        <div className="cursor-pointer">
                          <BsCartCheck
                            onClick={() => setLoginWarning(true)}
                            className="h-8 w-8 p-1 border dark:border-white border-adoppix hover:border-adoppix rounded-md text-green-400 duration-300"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
          <LoginFirst visible={loginWarning} onClose={handleOnCloseModal2} />
        </div>
      )}
      {!productDatas && (
        <div className="relative">
          <div className="container m-auto grid grid-cols-1 gap-4 place-items-center">
            <div className="p-5 dark:bg-adopsoftdark shadow-md rounded-lg mb-14">
              <div>
                <div>
                  <div className="relative">
                    <div className="animate-pulse h-[500px] w-full m-auto rounded-lg bg-adoplighticon dark:bg-adopdark"></div>
                  </div>
                </div>
              </div>
              <div>
                <div className="mt-4 grid grid-cols-12 w-full max-w-4xl rounded-md mb-2">
                  <div className="animate-pulse pb-5 w-3xl break-words col-span-11 dark:bg-adopdark bg-adoplighticon h-10 rounded-md"></div>
                </div>
                <div className="w-full max-w-4xl rounded-md grid grid-cols-4 gap-4">
                  <div className="col-span-3">
                    <div className="animate-pulse h-5 dark:bg-adopdark bg-adoplighticon rounded-md"></div>
                    <div className="mt-3">
                      <div className="h-6 dark:bg-adopdark bg-adoplighticon w-20 rounded-md mr-2 inline-block animate-pulse"></div>
                      <div className="h-6 dark:bg-adopdark bg-adoplighticon w-20 rounded-md mr-2 inline-block animate-pulse"></div>
                      <div className="h-6 dark:bg-adopdark bg-adoplighticon w-20 rounded-md mr-2 inline-block animate-pulse"></div>
                    </div>
                    <div className="my-5 cursor-default">
                      <div className="animate-pulse h-6 dark:bg-adopdark bg-adoplighticon w-16 rounded-md mb-4"></div>
                      <div className="pl-3">
                        <div className="animate-pulse rounded-full h-10 w-10 dark:bg-adopdark bg-adoplighticon inline-block"></div>
                        <div className="animate-pulse inline-block h-5 dark:bg-adopdark bg-adoplighticon w-40 rounded-md mb-4 ml-4"></div>
                        <div className="animate-pulse inline-block h-5 dark:bg-adopdark bg-adoplighticon w-10 rounded-md mb-4 ml-4"></div>
                      </div>
                    </div>
                  </div>
                  <div className="pl-6 cursor-default">
                    <div className="h-32 dark:bg-adopdark bg-adoplighticon w-full rounded-md mr-2 inline-block animate-pulse"></div>
                    <div className="grid grid-cols-6 mt-2 gap-2">
                      <div className="col-span-5 row-span-2 h-full w-full dark:bg-adopdark bg-adoplighticon rounded-md mr-2 inline-block animate-pulse"></div>
                      <div className="animate-pulse rounded-md h-8 w-8 dark:bg-adopdark bg-adoplighticon"></div>
                      <div className="animate-pulse rounded-md h-8 w-8 dark:bg-adopdark bg-adoplighticon"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      <SuccesefullBuy visible={succese} />
      <ConfirmModal
        onClose={handleOnClose}
        visible={modal}
        price={price}
        method={buy}
      />
    </div>
  );
};
