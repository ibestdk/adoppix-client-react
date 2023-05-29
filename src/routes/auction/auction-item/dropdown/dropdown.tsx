import "./dropdown.scss";
import React, { useState, useRef, useEffect } from "react";
import { BiSend } from "react-icons/bi";
import { BsEmojiSmile } from "react-icons/bs";

import "react-image-crop/dist/ReactCrop.css";
import EmojiPicker, { EmojiClickData } from "emoji-picker-react";
import { getUser } from "../../../../services/authorize";
import { postFeedsComment, postReport, putFeeds } from "../../../../services/feedsService";

export default function ModalRemoveConfirm({
  onclose,
  postdata,
  onClear,
  visible,
  remove,
}) {
  console.log(postdata);
  if (!visible) return null;
  const [emoji, setEmoji] = useState(false);
  const [confrimModal, setConfrimModal] = useState(false);
  const [bodyData, setBodyData] = useState({
    description: "",
  });
  const [tagsData, setTagsData] = useState([]);
  const bodyDataRef = useRef(bodyData);

  function handleInput(event) {
    const value = event.target.value;
    setBodyData((prevBodyData) => {
      const newBodyData = { ...prevBodyData, description: value };
      bodyDataRef.current = newBodyData;
      return newBodyData;
    });
  }


  const handleOnClose = (e) => {
    if (e.target.id === "modal-card") onclose();
  };



  useEffect(() => {}, [postdata]);

  return (
    <div
      id="modal-card"
      onClick={handleOnClose}
      className="mt-10 animation-custom fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center duration-300"
    >
      <div className=" dark:bg-adopsoftdark bg-adoplight w-[300px] p-4 rounded-lg animate-[wiggle_1s_ease-in-out_infinite]">
        <div className="text-2xl font-bold my-2 text-center">ยกเลิกการประมูล</div>
       <div className="text-lg m-3 text-center">
        <div>คุณแน่ใจหรือไม่ว่าต้องการยกเลิกการประมูล</div>
       </div>
        <div className="flex justify-end items-center">
          <div
            onClick={onclose}
            className="cursor-pointer text-base px-6 py-[0.4rem] border-2 border-white text-white rounded-lg mr-2"
          >
            ยกเลิก
          </div>
          <div
            onClick={remove}
            className="cursor-pointer text-base px-6 py-2 bg-red-500 text-white rounded-lg"
          >
            ยืนยัน
          </div>
        </div>
      </div>
    </div>
  );
}
