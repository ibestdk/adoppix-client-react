import { Card, Label, TextInput, Checkbox, Button } from "flowbite-react";
import { Link } from "react-router-dom";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import "./verifyEmailCard.scss";
const VerifyEmailCard = () => {
  const { token } = useParams();
  const navigate = useNavigate();

  const [isLoading, setisLoading] = useState(true);
  const [isSuccess, setisSuccess] = useState(false);
  
  const verifyEmailWithToken = () => {
    fetch(`https://api.adoppix.com/api/Auth/${token}/confirm-email`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    })
      .then((response) => response.json())
      .then((res) => {
        console.log("Success:", res);
        if (res.successful) {
          //sent data to authen services
          // sessionStorage.setItem("token", response.data)
          // console.log("sessionStroage was stored")
          //   navigate("/");
          setisLoading(false);
          setisSuccess(true);
          console.log("สำเร็จ");

          // localStorage.setItem("ut", res.data);
        } else {
            setisLoading(false);
            setisSuccess(false);
          console.log("ไม่สำเร็จ");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  useEffect(() => {
    

    console.log("useEffect")
 
    verifyEmailWithToken();
  }, []);

  return (
    <div className="max-w-sm m-auto flex items-center justify-center h-screen ">
      <div className="w-[350px] dark:bg-adopsoftdark pt-8 pb-16 px-5 shadow-[0px_0px_1px_black] rounded-lg">
        <div>
          <Link to="/">
            <div className="logo text-adoppix font-bold text-3xl text-center cursor-pointer">
              AdopPix
            </div>
          </Link>
          <p>param is : {token}</p>
        </div>
        <div>
          <h1 className="pb-6 text-center text-adopsoftdark dark:text-adoplight text-lg">ยืนยันอีเมล</h1>
        </div>
        <div>
          <div className="">
            {isLoading && (
              <div className="relative mt-10">
                <div className="relative animate-pulse  text-center">
                  <CircularProgress className="" size={100} />
                </div>

                <div className="animate-pulse font-bold text-2xl text-center text-gray-600 pt-24">
                  กำลังโหลด
                </div>
              </div>
            )}
            {!isLoading && isSuccess && (
              <div>
                <div className="check-container mx-auto">
                  <div className="check-background">
                    <svg
                      viewBox="0 0 65 51"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M7 25L27.3077 44L58.5 7"
                        stroke="white"
                        stroke-width="13"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  </div>
                  <div className="check-shadow"></div>
                </div>
                <div className="font-bold text-2xl text-center text-green-400">
                  ยืนยันอีเมลสำเร็จ
                </div>
              </div>
            )}
            {!isLoading && !isSuccess && (
              <div>
                <div className="o-circle c-container__circle o-circle__sign--failure">
                  <div className="o-circle__sign"></div>
                </div>
                <div className="font-bold text-2xl text-center text-red-500">
                  ยืนยันอีเมลผิดพลาด
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerifyEmailCard;
