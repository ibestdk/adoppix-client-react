import React, { useState, useEffect, useRef, useContext } from "react";
import "./like.scss";
import { AiOutlineHeart } from "react-icons/ai";
import { getToken, logout } from "../../../services/authorize";
import { useNavigate, Link } from "react-router-dom";
import { Switch } from "@mui/material";
import { DarkContext } from "../../../App";
import {
  BsFillGearFill,
  BsFillQuestionCircleFill,
  BsMoonFill,
  BsSun,
  BsImages,
  BsFillCreditCard2FrontFill,
  BsBank2,
} from "react-icons/bs";
import { AiFillStar } from "react-icons/ai";
import { MdLogout } from "react-icons/md";
import axios from "axios";
import { getAuctionLike } from "../../../services/auctionService";

export const LikeList = ({ istate }) => {
  const [likeList, setLikeList] = useState([]);
  const [sort, setSort] = useState(true);
  const [money, setMoney] = useState();
  const { darkToggle, setDarkToggle } = useContext(DarkContext);
  const navigate = useNavigate();

  const fsort = (bool) => {
    setSort(bool);
    setLikeList(likeList.reverse());
  };

  const [open, setOpen] = useState(false);
  let menuRef = useRef();

  const callLikeList = async () => {
    const result = await getAuctionLike();
    //console.log(result);

    setLikeList(result);
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
            <AiOutlineHeart className="text-[2rem] " />
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
            <div className="text-lg font-bold m-4">รายการโปรด</div>
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
              {likeList.length > 0 ? (
                likeList.map((like, index) => (
                  <Link to={`../../../auction/${like.auctionId}`}
                    key={index}
                    className="flex justify-between mx-2 my-2 py-2 hover:brightness-75 duration-200"
                  >
                    <div className="text-xs w-[220px] h-[100px] break-words overflow-hidden text-ellipsis p-2">
                      <div className="text-lg font-bold truncate ">
                        {like.title}
                      </div>
                      <div className="line-clamp-3 ">{like.description}</div>
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
                ))
              ) : (
                <div className="flex flex-col justify-center items-center mt-[40%]">
                  <div className="text-2xl">
                    ไม่พบรายการโปรด
                  </div>
                  <div className="text-xs opacity-60 text-center w-[200px]">
                    Tip : คุณสามารถเพิ่มได้โดยการกดถูกใจการประมูล
                  </div>
                </div>
              )}
            </div>
          </div>
          <div>
            <div
             
              className="text-lg font-bold flex justify-center items-center cursor-pointer p-2"
            >
           
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
