import React, { useState, useEffect, useRef } from "react";
import "./noti.scss";
import { logout } from "../../../services/authorize";
import { useNavigate } from "react-router-dom";
import {BsFillBellFill} from "react-icons/bs";

function NotiDropDown() {
  const navigate = useNavigate();

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
           <BsFillBellFill className="text-adoplighticon text-2xl"/>
          </div>
        </div>

        <div className={`dropdown-menu-noti ${open ? "active" : "inactive"}`}>
          <h3>
            Notification
          </h3>
          <ul>
            <DropdownItem text={"แจ้งเตือน"} />
            <DropdownItem text={"แจ้งเตือน"} />
            <DropdownItem text={"แจ้งเตือน"} />
            <DropdownItem text={"แจ้งเตือน"} />
            <DropdownItem text={"แจ้งเตือน"} />
            <DropdownItem text={"แจ้งเตือน"} />
            <DropdownItem text={"แจ้งเตือน"} />

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

export default NotiDropDown;
