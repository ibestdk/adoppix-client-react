import { Card, Label, TextInput, Button } from "flowbite-react";
import { Link } from "react-router-dom";
import Checkbox from "@mui/material/Checkbox";
import {BsEyeFill ,BsEyeSlashFill } from "react-icons/bs"

import { authenicate } from "../../../services/authorize";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
const LoginCard = () => {
  const navigate = useNavigate();
  const [isShowPassword, setIsShowPassword] = useState(false);

  const handleCheck = () => {
    console.log("called func handleCheck")
    setIsShowPassword(!isShowPassword);
    console.log(isShowPassword);
  };

  const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get("email"),
      password: data.get("password"),
    });

    const jsonData = {
      email: data.get("email"),
      password: data.get("password"),
    };

    fetch("https://api.adoppix.com/api/Auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify(jsonData),
    })
      .then((response) => response.json())
      .then((res) => {
        console.log("Success:", res);
        if (res.status) {
          //sent data to authen services
          // sessionStorage.setItem("token", response.data)
          // console.log("sessionStroage was stored")
          authenicate(res, () => {navigate("/"); window.location.reload();});
       
          // localStorage.setItem("ut", res.data);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <div className="max-w-sm m-auto flex items-center justify-center h-screen ">
      <div className="w-[350px] dark:bg-adopsoftdark bg-adoplight pt-8 pb-16 px-5 shadow-[0px_0px_1px_black] rounded-lg">
        <div>
          <Link to="/">
            <div className="logo text-adoppix font-bold text-3xl text-center cursor-pointer">
              AdopPix
            </div>
          </Link>
        </div>
        <div>
          <h1 className="text-center text-adopsoftdark text-lg">เข้าสู่ระบบ</h1>
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <div className="mb-2 block">
              <Label htmlFor="email" value="อีเมล" />
            </div>
            <TextInput
              id="email"
              type="email"
              name="email"
              placeholder="name@adoppix.com"
              required={true}
            />
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="password" value="รหัสผ่าน" />
            </div>
            <div className="flex">
              <TextInput
                className="w-[90%]"
                id="password"
                name="password"
                type={isShowPassword ? "text" : "password"}
                required={true}
              />
              <Checkbox
                
                className="dark:text-adoplight  text-adopsoftdark"
                icon={<BsEyeFill />}
                checkedIcon={<BsEyeSlashFill />}
                onClick={handleCheck}
              />
             
            </div>
          </div>
          <div>
            <Link to="/forgetpassword" className="float-right text-sm dark:text-adoplight text-adopdark">
              ลืมรหัสผ่าน?
            </Link>
          </div>
          <div className="flex items-center gap-2">
            <input className="rounded-md" type="checkbox" name="" id="" />
            <Label htmlFor="remember">จดจำฉัน</Label>
          </div>
          <Button type="submit">Login</Button>
          <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
            ยังไม่มีรหัสอย่างงั้นหรอ?{" "}
            <Link
              to="/signup"
              className="text-blue-700 hover:underline dark:text-blue-500"
            >
              คลิกเพื่อสมัครสมาชิก
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginCard;
