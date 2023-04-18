import React, { useState, useRef } from "react";

export default function ConfirmActionModal({ visible, onClose, action, method }) {

    const handleOnClose = (e) => {
        if (e.target.id === "modal-card") onClose();
    };

    if (!visible) return null;
    return (
        <div
            id="modal-card"
            onClick={handleOnClose}
            className="bg-opacity-30 fixed inset-0 backdrop-blur-sm flex justify-center items-center duration-300 z-50"
        >
            <div className=" dark:bg-adopsoftdark bg-adoplight w-[400px] p-4 rounded-lg animate-[wiggle_1s_ease-in-out_infinite] shadow-md">
                <div className="py-2 border-b-2 dark:border-adopdark border-adoplighticon">
                    <h2 className="dark:text-adoplight text-adopdark text-xl p-2 text-center">
                        ต้องการที่จะ <div className="font-bold text-3xl">{action} </div> หรือไม่?
                    </h2>
                </div>
                <div className="flex mt-2 min-h-[40px]">
                    <div className="grid grid-cols-2 gap-2 w-full h-10">
                        <div onClick={method} className="bg-adoppix text-white rounded-md text-center place-items-center pt-2 cursor-pointer hover:opacity-75">
                            ยืนยัน
                        </div>
                        <div onClick={onClose} className="bg-adoplighticon text-white rounded-md text-center place-items-center pt-2 cursor-pointer hover:opacity-75">
                            ยกเลิก
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}