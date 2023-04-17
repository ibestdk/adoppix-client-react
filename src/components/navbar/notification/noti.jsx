import React, { useState, useEffect, useRef } from "react";
import "./noti.scss";
import { logout } from "../../../services/authorize";
import { useNavigate } from "react-router-dom";
import { BsFillBellFill } from "react-icons/bs";

function NotiDropDown() {
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const [notiPage, setNotiPage] = useState(1);

  const handleChangeNotiPage = (page) =>{
    setNotiPage(page);
  }
  let menuRef = useRef();

  useEffect(() => {
    let handler = (e) => {
      if (!menuRef.current.contains(e.target)) {
        setOpen(false);
        // console.log(menuRef.current);
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
          <div>
            <BsFillBellFill className="text-adoplighticon text-2xl" />
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
              <div onClick={() => handleChangeNotiPage(1)} className={`${notiPage == 1 ? "dark:bg-adoppix" : "dark:bg-adopdark" } cursor-pointer px-2 py-2 rounded-l-lg `}>ทั้งหมด</div>
              <div onClick={() => handleChangeNotiPage(2)} className={`${notiPage == 2 ? "dark:bg-adoppix" : "dark:bg-adopdark" } cursor-pointer px-2 py-2 `}>ประมูล</div>
              <div onClick={() => handleChangeNotiPage(3)} className={`${notiPage == 3 ? "dark:bg-adoppix" : "dark:bg-adopdark" } cursor-pointer px-2 py-2 rounded-r-lg `}>ทั่วไป</div>
            </div>
          </div>
          <ul>
            <DropdownItem className="dark:text-adoplight" text={"แจ้งเตือน"} />
            <DropdownItem className="dark:text-adoplight" text={"แจ้งเตือน"} />
            <DropdownItem className="dark:text-adoplight" text={"แจ้งเตือน"} />
            <DropdownItem className="dark:text-adoplight" text={"แจ้งเตือน"} />
            <DropdownItem className="dark:text-adoplight" text={"แจ้งเตือน"} />
            <DropdownItem className="dark:text-adoplight" text={"แจ้งเตือน"} />
          </ul>
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
