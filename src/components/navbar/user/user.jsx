import React, { useState, useEffect, useRef, useContext } from "react";
import "./user.scss";
import { getToken, getUser, logout } from "../../../services/authorize";
import { useNavigate, Link } from "react-router-dom";
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

import { MdLogout } from "react-icons/md";
import axios from "axios";
import { setDarkModeAPI } from "../../../services/apiService";
import Switch from "../../switch";

function UserDropDown() {
  const [userData, setUserData] = useState([]);
  const [money, setMoney] = useState();
  const { darkToggle, setDarkToggle } = useContext(DarkContext);
  const navigate = useNavigate();

  const setDarkMode = async (darkMode) => {
    const result = await setDarkModeAPI(darkMode);
    console.log(result);
    setDarkToggle(darkMode);
  };

  const getUserMoney = async () => {
    const token = getToken();
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
      "Access-Control-Allow-Origin": "*",
    };

    let response = await axios({
      method: "get",
      url: `https://api.adoppix.com/api/User/money`,
      headers: headers,
    }).catch((err) => console.log(err.response));
    console.log(response.data.data);
    setMoney(response.data.data);
  };

  const resetRoute = () => {
    navigate("/");
    setTimeout(() => {
      location.reload();
    }, 1000);
  };

  const [open, setOpen] = useState(false);
  let menuRef = useRef();

  useEffect(() => {
    // console.log("ข้อมูลผู้ใช้: "+userData)
    console.log("ข้อมูลผู้ใช้: " + JSON.parse(localStorage.getItem("user")));
    getUserMoney();
    const user = getUser();
    if (user) {
      console.log("มีข้อมูล");
      console.log(user);
      setUserData(user);
    }

    let handler = (e) => {
      if (!menuRef.current.contains(e.target)) {
        setOpen(false);
        // console.log(menuRef.current);
      }
    };

    console.log(userData);
    document.addEventListener("mousedown", handler);

    return () => {
      document.removeEventListener("mousedown", handler);
    };
  }, []);

  return (
    <div className={`App`}>
      <div className="menu-container" ref={menuRef}>
        <div
          className="menu-trigger"
          onClick={() => {
            setOpen(!open);
          }}
        >
          <div>
            <img
              className="rounded-full border-2 p-1 bg-adoplight dark:bg-adopsoftdark border-adoppix outline-adoppix"
              src={`https://pix.adoppix.com/public/${
                userData.profileImage ? userData.profileImage : "brushsan.png"
              }`}
            ></img>
          </div>
        </div>

        <div
          className={`dropdown-menu ${
            open ? "active" : "inactive"
          }  dark:bg-adopsoftdark dark:before:bg-adopsoftdark duration-75 shadow-lg`}
        >
          <Link to={userData.username}>
            <div
              className="hover:opacity-70 mt-4 cursor-pointer rounded-lg duration-300 bg-cover bg-center bg-no-repeat"
              style={{
                backgroundImage:
                  "url(" +
                  `https://pix.adoppix.com/public/${
                    userData.coverImage
                      ? userData.coverImage
                      : "6d3ed0c6-f9f7-41f8-8142-2e8c0d71a3a5.jpg"
                  }` +
                  ")",
              }}
            >
              <p className="text-center pt-2 ">
                <img
                  className="rounded-full w-[60px] h-[60px] object-cover border-4 bg-adoplight dark:bg-adopsoftdark  border-adoppix outline-adoppix mx-auto shadow-lg"
                  src={`https://pix.adoppix.com/public/${
                    userData.profileImage
                      ? userData.profileImage
                      : "brushsan.png"
                  }`}
                ></img>
              </p>
              <h3 className="text-adoplight pt-0 shadow-lg drop-shadow-xl">
                {userData.username}
                <br className="dark:text-adoplight" />
                <span className="dark:text-adoplight shadow-xl">Artist</span>
              </h3>
            </div>
          </Link>
          <div className="text-right p-4">
            <div className="mt-2">
              <h4 className="text-[.75rem] duration-300  text-adopdark dark:text-adoplight">
                เงินคงเหลือ
              </h4>
            </div>
            <div>
              <h5 className="text-xl duration-300 text-adopdark dark:text-adoplight font-bold">
                {money && money}
              </h5>
            </div>
          </div>
          <div className="flex mt-1">
            <div className="cursor-pointer m-auto hover:bg-gray-200 text-adopdark dark:text-adoplight dark:hover:bg-adopdark w-full text-center p-2 rounded-lg duration-300">
              <Link className="flex text-lg" to={"topup"}>
                <BsFillCreditCard2FrontFill className="m-1" />
                เติมเงิน
              </Link>
            </div>
            <div className="m-auto hover:bg-gray-200 text-adopdark dark:text-adoplight dark:hover:bg-adopdark w-full text-center p-2 rounded-lg duration-300">
              <a className="flex text-lg">
                <BsBank2 className="m-1" />
                ถอนเงิน
              </a>
            </div>
          </div>
          <ul>
            <DropdownItem
              click={() => navigate("/inventories")}
              icon={<BsImages className="dark:text-adoplight  ml-3 mt-[4px]" />}
              text={"คลังรูปภาพ"}
            />
            <DropdownItem
              click={() => navigate("/setting/account")}
              icon={
                <BsFillGearFill className="dark:text-adoplight  ml-3 mt-[4px]" />
              }
              text={"ตั้งค่า"}
            />

            <li className="dropdownItem">
              <div className="flex justify-start items-center ml-3">
                <BsSun className="dark:text-adoplight   text-2xl" />
                <Switch
                  checked={darkToggle}
                  onChange={() => setDarkMode(!darkToggle)}
                />
                <BsMoonFill className="dark:text-adoplight  text-2xl" />
              </div>
            </li>

            <DropdownItem
              icon={
                <BsFillQuestionCircleFill className="dark:text-adoplight  ml-3 mt-[4px]" />
              }
              text={"การช่วยเหลือ"}
            />
            <DropdownItem
              icon={<MdLogout className="dark:text-adoplight  ml-3 mt-[4px]" />}
              click={() => logout(() => resetRoute())}
              text={"ออกจากระบบ"}
            />
          </ul>
        </div>
      </div>
    </div>
  );
}

function DropdownItem(props) {
  return (
    <li className="dropdownItem dark:hover:bg-adopdark hover:bg-gray-200 duration-300 rounded-lg">
      {props.icon}
      <a
        className="dark:text-adoplight text-lg w-[150px]"
        onClick={props.click}
      >
        {props.text}
      </a>
    </li>
  );
}
function DropdownTheme() {
  return (
    <li className="dropdownItem">
      <Switch checked={checked} onClick={setDarkMode} />
    </li>
  );
}

export default UserDropDown;
