import React, { useState, useEffect, useRef, useContext } from "react";
import "./cart.scss";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { useNavigate, Link } from "react-router-dom";

import axios from "axios";
import { getCartAPI } from "../../../../services/marketService";

export const CartList = ({ istate }) => {
  const [likeList, setLikeList] = useState([]);
  const [sort, setSort] = useState(true);
  const [money, setMoney] = useState();
  const navigate = useNavigate();

  const fsort = (bool) => {
    setSort(bool);
    setLikeList(likeList.reverse());
  };

  const [open, setOpen] = useState(false);
  let menuRef = useRef();

  const callLikeList = async () => {
    const result = await getCartAPI();
    //console.log(result.items);

    setLikeList(result.items);
  };
  useEffect(() => {
    let handler = (e) => {
      if (!menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => {
      document.removeEventListener("mousedown", handler);
    };
  }, []);
  useEffect(() => {
    callLikeList();
  }, [istate]);

  if (localStorage.getItem("token") === null) {
    return null; // Render nothing while redirecting
  }

  return (
    <div className={`App`}>
      <div className="menu-container" ref={menuRef}>
        <div
          className="menu-trigger"
          onClick={() => {
            setOpen(!open);
          }}
        >
          <div className="bg-adopsoftdark p-2 rounded-full shadow-lg relative">
            <AiOutlineShoppingCart className="text-[2rem] " />
            <div className="absolute left-8 top-8 text-xs bg-red-500 w-[25px] h-[25px] flex justify-center items-center rounded-full">
              {likeList.length > 0 ? likeList.length : 0}
            </div>
          </div>
        </div>

        <div
          className={`dropdown-like ${
            open ? "active" : "inactive"
          }  dark:bg-adopsoftdark dark:before:bg-adopsoftdark duration-75 shadow-lg max-h-[600px] pr-[0px]`}
        >
          <div className="flex justify-between items-center">
            <div className="text-lg font-bold m-4">การประมูลที่คุณถูกใจ</div>
            <div className="flex mr-2">
              <div
                onClick={() => fsort(true)}
                className={`cursor-pointer  text-sm mx-1 ${
                  sort ? "font-black" : " text-adoplighticon  "
                }`}
              >
                เก่าสุด
              </div>
              <div
                onClick={() => fsort(false)}
                className={` cursor-pointer  text-sm mx-1 ${
                  !sort ? "font-black" : " text-adoplighticon   "
                }`}
              >
                ล่าสุด
              </div>
            </div>
          </div>
          <div className="overflow-y-scroll h-[350px] flex flex-col justify-between">
            <div>
              {likeList &&
                likeList.map((like, index) => (
                  <Link to={`../../../market/${like.productId}`}
                    key={index}
                    className="flex justify-between mx-2 my-2 py-2 hover:brightness-75 duration-200"
                  >
                    <div className="text-xs w-[220px] h-[100px] break-words overflow-hidden text-ellipsis p-2">
                      <div className="text-lg font-bold truncate">
                        {like.title}
                      </div>
                      <div className="line-clamp-3">{like.description}</div>
                    </div>
                    <div className="w-[120px]">
                      <img
                        className="w-[100px] h-[100px] rounded-lg object-cover "
                        src={`https://pix.adoppix.com/public/${
                          like.image ? like.image : "brushsan.png"
                        }`}
                      />
                    </div>
                  </Link>
                ))}
            </div>
          </div>
          <div>
            <Link
              to="../../../market/cart"
              className="text-lg font-bold flex justify-center items-center cursor-pointer p-2"
            >
            ดูทั้งหมด
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
