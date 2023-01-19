import { BsFillPersonFill ,BsBank ,BsFillCreditCard2FrontFill} from "react-icons/bs";
import { Link, NavLink, Outlet } from "react-router-dom";
import {MdSecurity} from "react-icons/md"
const Setting = () => {
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
        <div className="grid grid-cols-12 gap-4">
          <div className=" ml-5 mr-5 col-span-3 h-[600px] rounded-lg">
            <div>
              <div>
                <NavLink
                  to="account"
                  className={({ isActive }) =>
                    isActive ? activeClassName : unActiveClassName
                  }
                >
                  <div className="flex">
                    <BsFillPersonFill className="my-auto mr-2" />
                    ข้อมูลสาธารณะ
                  </div>
                </NavLink>
              </div>
              <div>
                <NavLink
                  to="security"
                  className={({ isActive }) =>
                    isActive ? activeClassName : unActiveClassName
                  }
                >
                  <div className="flex">
                    <MdSecurity className="my-auto mr-2" />
                    ตั้งค่าความปลอดภัย
                  </div>
                </NavLink>
              </div>
              <div>
                <NavLink
                  to="payment"
                  className={({ isActive }) =>
                    isActive ? activeClassName : unActiveClassName
                  }
                >
                  <div className="flex">
                    <BsFillCreditCard2FrontFill className="my-auto mr-2" />
                    ตั้งค่าการชำระเงิน
                  </div>
                </NavLink>
              </div>
              <div>
                <NavLink
                  to="bank"
                  className={({ isActive }) =>
                    isActive ? activeClassName : unActiveClassName
                  }
                >
                  <div className="flex">
                    <BsBank className="my-auto mr-2" />
                    ตั้งค่าบัญชีธนาคาร
                  </div>
                </NavLink>
              </div>
            </div>
          </div>
          <div className=" mr-5 col-span-9 h-[1000px] rounded-lg">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Setting;
