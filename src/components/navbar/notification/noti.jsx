import React, { useState, useEffect, useRef } from "react";
import "./noti.scss";
import { logout } from "../../../services/authorize";
import { Link, useNavigate } from "react-router-dom";
import { BsFillBellFill ,BsDot } from "react-icons/bs";
import { getNotification } from "../../../services/apiService";

function NotiDropDown() {
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const [notiPage, setNotiPage] = useState(1);
  const [notiData, setNotiData] = useState([]);

  const handleChangeNotiPage = (page) => {
    setNotiPage(page);
  };
  let menuRef = useRef();

  useEffect(() => {
    (async () => {
      const results = await getNotification();
      console.log("==========================");
      console.log(results);
      setNotiData(results);
    })();
  }, []);

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
  });

  return (
    <div className="App">
      <div className="menu-container" ref={menuRef}>
        <div
          className="menu-trigger"
          onClick={() => {
            setOpen(!open);
          }}
        >
          <div className="relative">
            <BsFillBellFill className="text-adoplighticon text-2xl" />
            <div className="absolute top-0 right-0">
              <span className="relative flex h-2 w-2 z-50">
               <span className="animate-ping absolute bg-red-600 h-full w-full rounded-full bg-sky-400 opacity-75"></span>
               <span className="relative inline-flex rounded-full h-2 w-2 bg-red-600"></span>
              </span>
            </div>
          </div>
        </div>
        <div
          className={`dropdown-menu-noti ${
            open ? "active" : "inactive"
          } dark:bg-adopsoftdark dark:before:bg-adopsoftdark duration-75 shadow-lg`}
        >
          <div className=" flex justify-between items-center mt-2">
            <div className="dark:text-adoplight text-lg">Notification</div>
            <div className="flex text-xs  shadow-section-center   ">
              <div
                onClick={() => handleChangeNotiPage(1)}
                className={`${
                  notiPage == 1 ? "dark:bg-adoppix" : "dark:bg-adopdark"
                } cursor-pointer px-2 py-2 rounded-l-lg `}
              >
                ทั้งหมด
              </div>
              <div
                onClick={() => handleChangeNotiPage(2)}
                className={`${
                  notiPage == 2 ? "dark:bg-adoppix" : "dark:bg-adopdark"
                } cursor-pointer px-2 py-2 `}
              >
                ประมูล
              </div>
              <div
                onClick={() => handleChangeNotiPage(3)}
                className={`${
                  notiPage == 3 ? "dark:bg-adoppix" : "dark:bg-adopdark"
                } cursor-pointer px-2 py-2 rounded-r-lg `}
              >
                ทั่วไป
              </div>
            </div>
          </div>
          <div className="mt-4 overflow-y-scroll h-[370px]">
            {notiPage === 1 && (
              <div className=" ">
                {notiData && notiData.length > 0 ? (
                  <div>
                    {notiData.map((noti, index) => (
                      <Link
                        to={`auction/${noti.auctionId}`}
                        key={index}
                        className="flex justify-between items-center hover:opacity-60 p-1 rounded-lg hover:bg-adopdark duration-200 cursor-pointer"
                      >
                        <div className="flex">
                          <div className="mr-2">
                            <img
                              className="w-[45px] h-[45px] rounded-full"
                              src={
                                noti.image
                                  ? `https://pix.adoppix.com/public/${noti.image}`
                                  : "https://pix.adoppix.com/image/adop.png"
                              }
                            />
                          </div>
                          <div>
                            <div className="text-lg">{noti.name}</div>
                            <div className="text-xs">
                              {noti.event === "like" ? "ได้ถูกใจการประมูล" : ""}
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-col justify-center">
                          <img
                            className="w-[50px] h-[50px] rounded-lg mx-auto"
                            src={
                              noti.postImage
                                ? `https://pix.adoppix.com/public/${noti.postImage}`
                                : "https://pix.adoppix.com/image/adop.png"
                            }
                          />
                          <div className="text-xs text-center">
                            {noti.relativeTime}
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                ) : (
                  <div className="flex justify-center items-center opacity-30 mt-32 ">
                    ไม่มีการเเจ้งเตือน
                  </div>
                )}
              </div>
            )}
            {notiPage === 2 && <div>2</div>}
            {notiPage === 3 && <div>3</div>}
          </div>
        </div>
      </div>
    </div>
  );
}

function DropdownItem(props) {
  return (
    <li className="dropdownItem dark:hover:bg-adopdark hover:bg-gray-200 duration-300 rounded-lg">
      <a className="dark:text-adoplight" onClick={props.click}>
        {" "}
        {props.text}{" "}
      </a>
    </li>
  );
}

export default NotiDropDown;
