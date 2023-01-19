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
import UserDropDown from "../../components/navbar/user/user";
import NotiDropDown from "../../components/navbar/notification/noti";
import CreateDropDown from "../../components/navbar/create/create"

const Navigation = () => {
  const navigate = useNavigate();

  let activeStyle = {
    textDecoration: "underline",
    color: "red",
  };

  let activeClassName = "text-adoppix";
  let unActiveClassName = "text-adoplighticon";


  return (
    <Fragment>
      <nav className="bg-white px-2 sm:px-4 py-0 duration-300 dark:bg-adopsoftdark w-full z-20 top-0 left-0  dark:border-gray-600 static">
        <div className=" flex flex-wrap items-center justify-between mx-auto">
          <Link to="" className="logo text-adoppix font-bold text-3xl">AdopPix</Link>
          <div className="flex md:order-2 mr-10">
            {!getToken() && (
              <div>
                <Link to="login">
                  <button
                    type="button"
                    className="text-adopsoftdark focus:outline-none focus:ring-blue-300 font-bold rounded-lg text-sm px-5 py-2.5 text-center mr-3 md:mr-0 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    Sign In
                  </button>
                </Link>
                <Link to="signup">
                  <button
                    type="button"
                    className="text-white font-bold hover:opacity-80 duration-300  bg-adoppix focus:outline-none focus:ring-blue-300  rounded-lg text-sm px-5 py-2.5 text-center mr-3 md:mr-0 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    Sign Up
                  </button>
                </Link>
              </div>
            )}

            {getToken() && (
              <div className=" m-auto flex items-center justify-center">
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
            className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
            id="navbar-sticky"
          >
            <ul className="flex flex-col p-4 mt-4 border  rounded-lg  md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0   dark:border-gray-700">
              <li>
                <NavLink to=""
      
                   className={({ isActive }) =>
              isActive ? activeClassName : unActiveClassName
            }
                  aria-current="page"
                >

                  <FontAwesomeIcon
                    className="icon-size"
                    icon={faHome}
                  />
                </NavLink>
              </li>
              <li>
                <NavLink to="Auction"
                  className={({ isActive }) =>
              isActive ? activeClassName : unActiveClassName
            }
                >
                  <FontAwesomeIcon
                    className=" icon-size"
                    icon={faGavel}
                  />
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="market"
                  className={({ isActive }) =>
                  isActive ? activeClassName : unActiveClassName
                }
                >
                  <FontAwesomeIcon
                    className=" icon-size"
                    icon={faStore}
                  />
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="feeds"
                  className={({ isActive }) =>
                  isActive ? activeClassName : unActiveClassName
                }
                >
                  <FontAwesomeIcon
                    className=" icon-size"
                    icon={faUsers}
                  />
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
