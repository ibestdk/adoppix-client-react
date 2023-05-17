import { Fragment } from "react";
import { Outlet, Link, useNavigate, NavLink } from "react-router-dom";
import { logout, getToken } from "../../services/authorize";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUsers,
  faHome,
  faGavel,
  faStore,
} from "@fortawesome/free-solid-svg-icons";
import "./navigation.style.scss";
import React from "react";
import UserDropDown from "../../components/navbar/user/user";
import NotiDropDown from "../../components/navbar/notification/noti";
import CreateDropDown from "../../components/navbar/create/create";

import LiveSearch from "../search/search";

const Navigation = () => {

  let activeStyle = {
    textDecoration: "underline",
    color: "red",
  };

  let activeClassName = "text-adoppix";
  let unActiveClassName = "text-adoplighticon";

  return (
    <Fragment>
      <nav className="z-50 bg-white px-2 sm:px-4 py-0 duration-300 dark:bg-adopsoftdark w-full top-0 left-0  dark:border-gray-600  sticky">
        <div className=" flex items-center justify-between mx-auto">
          <div className="flex justify-start  w-[30%]">
            <Link to="" className="logo text-adoppix font-bold text-3xl">
              AdopPix
            </Link>
            <LiveSearch  />
          </div>
          <div className="flex  md:order-2 mx-auto sm:mx-2 justify-end  w-[30%]">
            {!getToken() && (
              <div>
                <Link to="login">
                  <button
                    type="button"
                    className="text-adopsoftdark focus:outline-none focus:ring-blue-300 font-bold rounded-lg text-sm px-5 py-2.5 text-center mr-3 md:mr-0  dark:text-adoplight"
                  >
                    Sign In
                  </button>
                </Link>
                <Link to="signup">
                  <button
                    type="button"
                    className="text-white font-bold hover:opacity-80 duration-300  bg-adoppix focus:outline-none focus:ring-blue-300  rounded-lg text-sm px-5 py-2.5 text-center mr-3 md:mr-0dark:bg-adoppix dark:text-adoplight"
                  >
                    Sign Up
                  </button>
                </Link>
              </div>
            )}

            {getToken() && (
              <div className=" flex items-center justify-center">
                <div className="sm:hidden w-auto">
                  <CenterMenu />
                </div>
                <div className="pr-10">
                  <CreateDropDown />
                </div>
                <div className="pr-7">
                  <NotiDropDown />
                </div>
                <div>
                  <UserDropDown />
                </div>
              </div>
            )}
          </div>

          <div
            className="items-center justify-between hidden w-[40%] md:flex md:w-auto md:order-1  "
            id="navbar-sticky"
          >
            <ul className="flex flex-col p-4 mt-4 border  rounded-lg  md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0   dark:border-gray-700">
              <li>
                <NavLink
                  to=""
                  className={({ isActive }) =>
                    isActive ? activeClassName : unActiveClassName
                  }
                  aria-current="page"
                >
                  <FontAwesomeIcon className="icon-size" icon={faHome} />
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="Auction"
                  className={({ isActive }) =>
                    isActive ? activeClassName : unActiveClassName
                  }
                >
                  <FontAwesomeIcon className=" icon-size" icon={faGavel} />
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="market"
                  className={({ isActive }) =>
                    isActive ? activeClassName : unActiveClassName
                  }
                >
                  <FontAwesomeIcon className=" icon-size" icon={faStore} />
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="feeds"
                  className={({ isActive }) =>
                    isActive ? activeClassName : unActiveClassName
                  }
                >
                  <FontAwesomeIcon className=" icon-size" icon={faUsers} />
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </Fragment>
  );
};

export default Navigation;

const CenterMenu = () => {
  let activeClassName = "text-adoppix";
  let unActiveClassName = "text-adoplighticon";
  return (
    <div className="">
      <ul className="flex    justify-center items-center   ">
        <li className="mx-4">
          <NavLink
            to=""
            className={({ isActive }) =>
              isActive ? activeClassName : unActiveClassName
            }
            aria-current="page"
          >
            <FontAwesomeIcon className="icon-size" icon={faHome} />
          </NavLink>
        </li>
        <li className="mx-4">
          <NavLink
            to="Auction"
            className={({ isActive }) =>
              isActive ? activeClassName : unActiveClassName
            }
          >
            <FontAwesomeIcon className=" icon-size" icon={faGavel} />
          </NavLink>
        </li>
        <li className="mx-4">
          <NavLink
            to="market"
            className={({ isActive }) =>
              isActive ? activeClassName : unActiveClassName
            }
          >
            <FontAwesomeIcon className=" icon-size" icon={faStore} />
          </NavLink>
        </li>
        <li className="mx-4">
          <NavLink
            to="feeds"
            className={({ isActive }) =>
              isActive ? activeClassName : unActiveClassName
            }
          >
            <FontAwesomeIcon className=" icon-size" icon={faUsers} />
          </NavLink>
        </li>
      </ul>
    </div>
  );
};
