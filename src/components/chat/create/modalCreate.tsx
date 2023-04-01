import "./modalCreate.scss";
import React, { useState, useRef } from "react";

export default function ModalAddChat({ visible, onClose }) {
  const handleOnClose = (e) => {
    if (e.target.id === "modal-card") onClose();
  };

  if (!visible) return null;
  return (
    <div
      id="modal-card"
      onClick={handleOnClose}
      className="animation-custom fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center duration-300"
    >
      <div className=" dark:bg-adopsoftdark bg-adoplight w-[400px] p-4 rounded-lg animate-[wiggle_1s_ease-in-out_infinite]">
        <div className="py-2 border-b-4 dark:border-adopdark border-adoplighticon">
          <h2 className="dark:text-adoplight text-adopdark text-xl p-2 text-center">
            ข้อความใหม่
          </h2>
        </div>
        <div
          id="body"
          className="min-h-[250px] py-2 border-b-4 dark:border-adopdark border-adoplighticon"
        >
          <div className="flex border-b-2">
            <div className="text-lg">ถึง :</div>
            <div>
              <input
                type="text"
                className="text-lg bg-adoplight dark:bg-adopsoftdark"
              />
            </div>
          </div>
          <div>
            <textarea
            
           
              id="default-input"
              className="mt-2 h-[300px] bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-gray-400 focus:border-gray-400 block w-full p-2.5 dark:bg-adopsoftdark dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-gray-400 dark:focus:border-gray-400"
            />
          </div>
        </div>
        <div id="footer" className="flex mt-2 relative min-h-[40px]">
          <div className="absolute right-0">
            <button
              className="mx-2 bg-adoplighticon py-2 px-4 rounded-lg"
              onClick={onClose}
            >
              ยกเลิก
            </button>
            <button className="mx-2 bg-adoppix py-2 px-4 rounded-lg">
              ส่ง
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
