import { Card, Label, TextInput, Checkbox, Button } from "flowbite-react";
import { Link } from "react-router-dom";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import "./success.scss";
export const BuySuccess = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/inventories');
    }, 8000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="h-screen w-screen  mt-[-10rem] flex items-center justify-center">
      <div className="flex items-center justify-center ">
        <div className="bg-adopsoftdark p-5 rounded-lg w-[350px]">
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
              สั่งซื้อสำเร็จ
            </div>
            <div className="font-bold text-lg mt-6 text-center text-white">
              กำลังพาคุณไปยังหน้าคลังรูปภาพ
            </div>
            <div className="font-bold text-sm mt-6 text-center flex justify-center text-white">
              หากหน้ายังไม่พาไปสามารถ
              <div onClick={() => navigate('/inventories')} className="text-adoppix cursor-pointer">
              คลิกที่นี่
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
