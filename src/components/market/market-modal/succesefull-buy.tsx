import React, { useState, useRef } from "react";

export default function SuccesefullBuy({ visible }) {

    if (!visible) return null;
    return (
        <div
            id="modal-card"
            className="bg-opacity-30 fixed inset-0 backdrop-blur-sm flex justify-center items-center duration-300 z-50"
        >
            <div className=" dark:bg-adopsoftdark bg-adoplight w-[400px] p-4 rounded-lg animate-[wiggle_1s_ease-in-out_infinite] shadow-md">
                <div className="py-2">
                    <h2 className="dark:text-adoplight text-adopdark text-3xl p-2 text-center">
                        ซื้อสินค้าสำเร็จ
                        <div className="text-adoppix text-xl mt-2">
                            ขอบคุณที่ใช้จ่ายกับเว็บเรา!!
                        </div>
                    </h2>
                </div>
            </div>
        </div>
    )
}