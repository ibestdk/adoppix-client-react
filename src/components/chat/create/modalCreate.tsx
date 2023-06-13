import LiveSearchChat from "../../../routes/search-usesr-chat/searchchat";
import { handleSubmitNewMessage } from "../../../services/apiService";
import "./modalCreate.scss";
import React, { useState, useEffect, useRef } from "react";

export default function ModalAddChat({ visible, onClose }) {
  const [selectUsername, setSelectUsername] = useState({
    username : ""
  });
  const [message, setMessage] = useState("");
  const handleOnClose = (e) => {
    if (e.target.id === "modal-card") onClose();
  };

  // const typeTitle = (e) => {
  //   setSelectUsername((prevBank) => ({
  //     ...prevBank,
  //     username: e.target.value,
  //   }));
  // };

  const handleMessageChange = (e) => {
    setMessage(e.target.value);
  };

  const sendMessage = async () => {
    const result = await handleSubmitNewMessage(selectUsername);
    if (result) {
      onClose()
    }
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
            <div className="text-lg w-8 flex items-end">ถึง :</div>
            <div className="w-full">
              <LiveSearchChat
                selectUsername={selectUsername}
                setSelectUsername={setSelectUsername}
              />
            </div>
          </div>
          <div>
       
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
            <button
              onClick={sendMessage}
              className="mx-2 bg-adoppix py-2 px-4 rounded-lg"
            >
              ส่ง
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
