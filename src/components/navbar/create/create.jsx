import React, { useState, useEffect, useRef } from "react";
import "./create.scss";
import { logout } from "../../../services/authorize";
import { Link, useNavigate } from "react-router-dom";
import { ToggleSwitch } from "flowbite-react";
import { BsBrushFill } from "react-icons/bs";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function CreateDropDown() {
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);

  let menuRef = useRef();

  useEffect(() => {
    let handler = (e) => {
      if (!menuRef.current.contains(e.target)) {
        setOpen(false);
        // //console.log(menuRef.current);
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
            <BsBrushFill className="text-adoplighticon text-2xl" />
          </div>
        </div>

        <div className={`dropdown-menu-create ${open ? "active" : "inactive"} dark:bg-adopsoftdark dark:before:bg-adopsoftdark duration-75 shadow-lg `}>
          <h3>
            Create
            <br />
            <span>Make your illustration to public</span>
          </h3>
          <ul>
            <DropdownItem route={"auction/create"} text={"Auction"} />
            <DropdownItem route={"market/create"} text={"Market"} />
            <DropdownItem route={""} text={"Post"} />
          </ul>
        </div>
      </div>
    </div>
  );
}

function DropdownItem(props) {
  return (
    <li className="dropdownItem dark:hover:bg-adopdark hover:bg-gray-200 duration-300 rounded-lg">
    
      <Link to={props.route} className="dark:text-adoplight"  onClick={props.click}> {props.text} </Link>
    </li>
  );
}

export default CreateDropDown;
