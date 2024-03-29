import { Card, Label, TextInput, Checkbox, Button } from "flowbite-react";
import { Link } from "react-router-dom";
import { authenicate } from "../../../services/authorize";
import { useNavigate } from "react-router-dom";

const ForgetPasswordCard = () => {
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    // //console.log({
    //   email: data.get("email"),
    // });
    
    const jsonData = {
        email: data.get("email"),
    };

//https://api.adoppix.com/api/Auth/f53493d7-78e1-4261-8b5c-fa4c6ce8da0c/forget-password  PUT METHOD  RESET PASSWORD Pess New Password Two Time
    // //console.log(`https://api.adoppix.com/api/Auth/${jsonData.email}/forget-password`)
    fetch(`https://api.adoppix.com/api/Auth/${jsonData.email}/forget-password`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    })
      .then((response) => response.json())
      .then((res) => {
        //console.log("Success:", res);
        if (res.status) {
          //sent data to authen services
          // sessionStorage.setItem("token", response.data)
          // //console.log("sessionStroage was stored")
          navigate("/forgetpassword/mailsended");

          // localStorage.setItem("ut", res.data);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <div className="max-w-sm m-auto flex items-center justify-center h-screen ">
      <div className="w-[350px] dark:bg-adopsoftdark pt-8 pb-16 px-5 shadow-[0px_0px_1px_black] rounded-lg">
        <div>
          <Link to="/">
            <div className="logo pb-3 text-adoppix font-bold text-3xl text-center cursor-pointer">
              AdopPix
            </div>
          </Link>
        </div>
        <div className="pb-8">

          <h1 className="text-center text-adopsoftdark dark:text-adoplight text-lg">กรุณากรอกอีเมลเพื่อส่งลิงค์สำหรับรีเซ็ตรหัสผ่านไปยังอีเมลของคุณ</h1>
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="pb-5">
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
          

          <Button className="bg-adoppix" type="submit">ส่ง</Button>
          <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
            จำรหัสผ่านของคุณได้เเล้ว?{" "}
            <Link
              to="/login"
              className="text-blue-700 hover:underline dark:text-blue-500"
            >
              กลับหน้าเข้าสู่ระบบ
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ForgetPasswordCard;
