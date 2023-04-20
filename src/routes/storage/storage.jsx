import {
  BsFillPersonFill,
  BsBank,
  BsFillCreditCard2FrontFill,
} from "react-icons/bs";
import { Link, NavLink, Outlet } from "react-router-dom";
import { MdSecurity } from "react-icons/md";
const Storage = () => {
  let activeStyle = {
    textDecoration: "underline",
    color: "red",
  };

  let activeClassName =
    "text-adoppix dark:bg-adopsoftdark py-2 px-4 rounded-lg w-full block my-2  ";
  let unActiveClassName =
    "text-adopdark dark:text-adoplight hover:bg-adopsoftdark dark:hover:text-adoppix py-2 px-4 duration-500 rounded-lg w-full block my-2";

  return (
    <div className="dark:bg-adopdark bg-adoplight pt-12">
      <div className="container m-auto ">
        <Outlet />
      </div>
    </div>
  );
};

export default Storage;
