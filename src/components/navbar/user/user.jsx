import React, { useState, useEffect, useRef, useContext } from "react";
import "./user.scss";
import { logout } from "../../../services/authorize";
import { useNavigate } from "react-router-dom";
import { Switch } from "@mui/material";
import { DarkContext } from "../../../App";

function UserDropDown() {
  const { darkToggle , setDarkToggle} = useContext(DarkContext);
  const navigate = useNavigate();

  const setDarkMode = (darkMode) => {
    console.log("loaded theme before change Ss : " + sessionStorage.getItem("theme"));
    console.log("loaded theme before change Ss : " + darkToggle);
    console.log("theme will change to : " + darkMode)
    setDarkToggle(darkMode)
    sessionStorage.setItem("theme" , darkMode)
    console.log("set theme to session"+ darkToggle && darkToggle);
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
      <div
        className="menu-container"
        ref={menuRef}
      >
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

        <div className={`dropdown-menu ${open ? "active" : "inactive"}`}>
          <h3>
            The Kiet
            <br />
            <span>Website Designer</span>
          </h3>
          <ul>
            <DropdownItem text={"Settings"} />

            <li className="dropdownItem">
              <Switch onClick={() => setDarkMode(!darkToggle)} />
            </li>

            <DropdownItem text={"Helps"} />
            <DropdownItem
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
    <li className="dropdownItem">
      <a onClick={props.click}> {props.text} </a>
    </li>
  );
}
function DropdownTheme() {
  return (
    <li className="dropdownItem">
      <Switch checked={checked}  onClick={setDarkMode} />
    </li>
  );
}

export default UserDropDown;
