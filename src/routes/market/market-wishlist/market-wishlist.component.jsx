
import { AiOutlineShoppingCart } from "react-icons/ai";
import { getToken } from "../../../services/authorize";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AiFillStar } from "react-icons/ai";
import { getWishListsAPI } from "../../../services/marketService";
import { WishListCard } from "./wishListCard";
import { WishListCardSkeleton } from "./wishListSkeleton";

export const MarketWishList = () => {
  const navigate = useNavigate();

  const navigateBack = () => {
    navigate(`../`);
  };

  const navigateToCart = () => {
    navigate(`../cart`);
  };

  const [wishlist, setWishList] = useState();

  const getWishLists = async () => {
    const result = await getWishListsAPI();
    console.log(result)
    setWishList(result);
  };

  const naviagteToItem = function (id) {
    navigate(`../${id}`);
  };

  const removeWishlistFromList = function (index) {
    //wishList();
    setWishList(wishlist.filter((item, i) => i != index));
  };

  const toCart = async (id, index) => {
    const token = getToken();
    const headers = {
      Authorization: `Bearer ${token}`,
      "Access-Control-Allow-Origin": "*",
    };

    // API Caller
    axios({
      method: "post",
      url: `https://api.adoppix.com/api/Product/${id}/toggle-cart`,
      headers: headers,
    })
      .then((res) => {
        console.log(res);
        removeWishlistFromList(index);
      })
      .catch((err) => console.log(err));
  };

  const wishList = async (id, index) => {
    const token = getToken();
    const headers = {
      Authorization: `Bearer ${token}`,
      "Access-Control-Allow-Origin": "*",
    };

    // API Caller
    axios({
      method: "patch",
      url: `https://api.adoppix.com/api/Product/${id}/wishlist`,
      headers: headers,
    })
      .then((res) => {
        console.log(res);
        removeWishlistFromList(index);
      })
      .catch((err) => console.log(err));
  };

  const [isLogin, setIsLogin] = useState(false);
  const userOrGuest = async () => {
    const token = getToken();
    if (token === false || token === undefined) {
      setIsLogin(false);
    } else {
      setIsLogin(true);
      getWishLists();
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
         
          <div className="container m-auto px-80 py-14">
            <div className="text-3xl dark:text-adoplight text-adopdark">
              <b>รายการที่อยากได้</b>
            </div>

            <div className="rounded-md p-10 bg-adopsoftdark py-10 mt-5">
              {wishlist &&
                wishlist.map((data, dataIndex) => (
                 <WishListCard data={data} naviagteToItem={naviagteToItem} toCart={toCart} dataIndex={dataIndex} wishList={wishList}  key={dataIndex} />
                ))}
              {!wishlist && (
               <WishListCardSkeleton />
              )}
              {wishlist && wishlist.length == 0 && (
                <div className="text-center">
                  ไม่มีสินค้าที่อยากได้ ลองค้นหาสินค้าที่สนใจดูหน่อยไหม?
                </div>
              )}
            </div>
          </div>
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
