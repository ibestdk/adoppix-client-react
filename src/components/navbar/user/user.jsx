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
} from "react-icons/bs";
import { MdLogout } from "react-icons/md";

function UserDropDown() {
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
          <h3 className="dark:text-adoplight">
            The Kiet
            <br className="dark:text-adoplight" />
            <span className="dark:text-adoplight">Website Designer</span>
          </h3>
          <ul>
            <DropdownItem
              click={() => navigate("/setting")}
              icon={
                <BsFillGearFill className="dark:text-adoplight  ml-3 mt-[4px]" />
              }
              text={"Settings"}
            />

            <li className="dropdownItem">
              <BsMoonFill className="dark:text-adoplight  ml-3 mr-2 mt-2 text-xl" />
              <Switch onClick={() => setDarkMode(!darkToggle)} />
              <BsSun className="dark:text-adoplight  ml-2 mt-2 text-xl"/>
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
