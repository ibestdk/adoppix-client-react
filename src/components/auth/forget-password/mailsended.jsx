import { Card, Label, TextInput, Checkbox, Button } from "flowbite-react";
import { Link } from "react-router-dom";
import { authenicate } from "../../../services/authorize";
import { useNavigate } from "react-router-dom";

const MailPasswordSended = () => {
  const navigate = useNavigate();

  return (
    <div className="dark:bg-adopdark">
      <div className="max-w-sm m-auto flex items-center justify-center h-screen ">
        <div className="w-[350px] dark:bg-adopsoftdark pt-8 pb-16 px-5 shadow-[0px_0px_10px_black rounded-lg">
          <div>
            <Link to="/">
              <div className="logo pb-3 text-adoppix font-bold text-3xl text-center cursor-pointer">
                AdopPix
              </div>
            </Link>
          </div>
          <div className="pb-8">
            <h1 className="text-center px-4  text-adopsoftdark dark:text-adoplight text-lg">
              ลิงค์สำหรับเปลี่ยนรหัสผ่านถูกส่งไปยังอีเมลของคุณเเล้ว
            </h1>
          </div>
          <div className="pb-5">
            <img
              className="w-[200px] m-auto"
              src="
       https://cdn.discordapp.com/attachments/939012816839507998/1039876742287998976/send_mail_crop.gif"
              alt=""
            />
          </div>
          <div>
            <p>ในบางครั้งอีเมลอาจจะไปอยู่ในถังขยะของเมล</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MailPasswordSended;
