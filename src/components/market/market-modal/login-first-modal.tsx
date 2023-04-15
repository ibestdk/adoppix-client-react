import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { AiOutlineClose } from "react-icons/ai";

export default function LoginFirst ({ visible,onClose }) {

    const handleOnClose = (e) => {
        if (e.target.id === "modal-card") onClose();
    };

    const navigate = useNavigate();

    if (!visible) return null;
    return (
        <div
            id="modal-card"
            onClick={handleOnClose}
            className="bg-opacity-30 fixed inset-0 backdrop-blur-sm flex justify-center items-center duration-300 z-50"
        >
            <div className=" dark:bg-adopsoftdark bg-adoplight w-[500px] p-4 rounded-lg animate-[wiggle_1s_ease-in-out_infinite] shadow-md">
                <div className="w-full flex justify-end">
                    <AiOutlineClose onClick={onClose} className="hover:bg-adoplighticon duration-300 rounded-md"></AiOutlineClose>
                </div>
                <div className="py-2 mb-[24px]">
                    <h2 className="dark:text-adoplight text-adopdark text-3xl p-2 text-center">
                        โปรดลงชื่อเข้าใช้ก่อนทำรายการ
                        <div onClick={() => navigate('../login')} className="text-adoppix text-xl mt-2 hover:opacity-75 cursor-pointer w-fit text-center m-auto">
                            ไปลงชื่อเข้าใช้งาน?
                        </div>
                        <div onClick={() => navigate('../signup')} className="text-adoppix text-xl mt-2 hover:opacity-75 cursor-pointer w-fit text-center m-auto">
                            ไปลงทะเบียนเข้าใช้งาน?
                        </div>
                    </h2>
                </div>
            </div>
        </div>
    )
}