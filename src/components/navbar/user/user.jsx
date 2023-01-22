import React, { useState, useEffect, useRef, useContext } from "react";
import "./user.scss";
import { logout } from "../../../services/authorize";
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

import { MdLogout } from "react-icons/md";

function UserDropDown() {

  // const {userData } = sessionStorage.getItem("user");
  const { darkToggle, setDarkToggle } = useContext(DarkContext);
  const navigate = useNavigate();

  const setDarkMode = (darkMode) => {
    console.log(
      "loaded theme before change Ss : " + sessionStorage.getItem("theme")
    );
    console.log("loaded theme before change Ss : " + darkToggle);
    console.log("theme will change to : " + darkMode);
    setDarkToggle(darkMode);
    sessionStorage.setItem("theme", darkMode);
    console.log("set theme to session" + darkToggle && darkToggle);
  };

  const [open, setOpen] = useState(false);
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
              className="rounded-full border-2 p-1 border-adoppix outline-adoppix"
              src="https://pix.adoppix.com/public/1f535da9-d0ae-4519-b513-26e29c7cfde2.jpg"
            ></img>
          </div>
        
        </div>

        <div
          className={`dropdown-menu ${
            open ? "active" : "inactive"
          }  dark:bg-adopsoftdark dark:before:bg-adopsoftdark duration-75 shadow-lg`}
        >
          <Link to="ibestdk">
            <div
              className="hover:opacity-70 mt-4 cursor-pointer rounded-lg duration-300 object-contain bg-repeat-round bg-center"
              style={{
                backgroundImage:
                  "url(" +
                  "https://pix.adoppix.com/public/368443ba-e19e-4207-85b3-d51bb8c5d401.jpg" +
                  ")",
              }}
            >
              <p className="text-center pt-2 ">
                <img
                  className="rounded-full w-[60px] border-4  border-adoppix outline-adoppix mx-auto shadow-lg"
                  src="https://pix.adoppix.com/public/1f535da9-d0ae-4519-b513-26e29c7cfde2.jpg"
                ></img>
              </p>
              <h3 className="text-adoplight pt-0 shadow-lg">
                ibestdk
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
                3650.34
              </h5>
            </div>
          </div>
          <div className="flex mt-1">
            <div className="m-auto hover:bg-gray-200 text-adopdark dark:text-adoplight dark:hover:bg-adopdark w-full text-center p-2 rounded-lg duration-300">
              <a className="flex">
                {" "}
                <BsFillCreditCard2FrontFill className="m-1" />
                เติมเงิน
              </a>
            </div>
            <div className="m-auto hover:bg-gray-200 text-adopdark dark:text-adoplight dark:hover:bg-adopdark w-full text-center p-2 rounded-lg duration-300">
              <a className="flex ">
                <BsBank2 className="m-1" />
                ถอนเงิน
              </a>
            </div>
          </div>
          <ul>
            <DropdownItem
              click={() => navigate("/setting/account")}
              icon={<BsImages className="dark:text-adoplight  ml-3 mt-[4px]" />}
              text={"คลังรูปภาพ"}
            />
            <DropdownItem
              click={() => navigate("/setting/account")}
              icon={
                <BsFillGearFill className="dark:text-adoplight  ml-3 mt-[4px]" />
              }
              text={"Settings"}
            />

            <li className="dropdownItem">
              <BsMoonFill className="dark:text-adoplight  ml-3 mr-2 mt-2 text-xl" />
              <Switch onClick={() => setDarkMode(!darkToggle)} />
              <BsSun className="dark:text-adoplight  ml-2 mt-2 text-xl" />
            </li>

            <DropdownItem
              icon={
                <BsFillQuestionCircleFill className="dark:text-adoplight  ml-3 mt-[4px]" />
              }
              text={"Helps"}
            />
            <DropdownItem
              icon={<MdLogout className="dark:text-adoplight  ml-3 mt-[4px]" />}
              click={() => logout(() => navigate("/"))}
              text={"Logout"}
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
      <a className="dark:text-adoplight" onClick={props.click}>
        {" "}
        {props.text}{" "}
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
