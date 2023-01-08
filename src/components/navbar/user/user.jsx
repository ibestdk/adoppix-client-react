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
              src="https://scontent.fbkk5-7.fna.fbcdn.net/v/t39.30808-6/324412699_1199299450681684_3832415891113419099_n.jpg?stp=dst-jpg_p526x296&_nc_cat=107&ccb=1-7&_nc_sid=8bfeb9&_nc_eui2=AeETzVCVvVdW4VEI0WJNTAFeeNn_4WZ8T8542f_hZnxPzo04Dd1_wO7h1TRr3SLI_ZLgbgaeAkbKWEYpYGzRdH_w&_nc_ohc=z5tAJpeJ2R8AX8mWuDH&_nc_oc=AQmsY6oZ1qtyCHynSYbzLBP4P5kMe4RYYs6Z5SoCHdD1Oh50ef_3E1dhdchq5Bn9WXI&_nc_ht=scontent.fbkk5-7.fna&oh=00_AfCV-OjC7cv85FyXGBYELfOihdj4Nda70H03Uca7pkNfvg&oe=63BE0739"
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
