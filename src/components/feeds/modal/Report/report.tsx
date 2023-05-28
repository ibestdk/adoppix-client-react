import "./edit.scss";
import React, { useState, useRef, useEffect } from "react";
import { BiSend } from "react-icons/bi";
import { BsEmojiSmile } from "react-icons/bs";

import "react-image-crop/dist/ReactCrop.css";
import EmojiPicker, { EmojiClickData } from "emoji-picker-react";
import { getUser } from "../../../../services/authorize";
import { postFeedsComment, postReport, putFeeds } from "../../../../services/feedsService";
import Chips from "../../../input/chips/chips";

export default function ModalReport({
  onclose,
  postdata,
  onClear,
  visible,
  reloadFeeds,
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

  //console.log(postdata);
  // //console.log(userData.profileImage)
  const handleOnClose = (e) => {
    if (e.target.id === "modal-card") onclose();
  };

  // const handleCloseConfrim = (e) => {
  //   //console.log("handleCloseConfrim called")
  //   if (e.target.id === "modal-confirm") setConfrimModal(false);
  // };

  const handleSubbmit = async () => {

    //console.log("submit", bodyData);
    const result = await postReport(postdata.postId, bodyData);
    if (result === "Successful") {
      //console.log("Success")
      onclose();
      reloadFeeds();
    }
  };

  useEffect(() => {}, [postdata]);

  return (
    <div
      id="modal-card"
      onClick={handleOnClose}
      className="mt-10 animation-custom fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center duration-300"
    >
      <div className=" dark:bg-adopsoftdark bg-adoplight w-[500px] p-4 rounded-lg animate-[wiggle_1s_ease-in-out_infinite]">
        <div className="text-2xl font-bold my-2 text-center">รายงานโพสต์</div>
        <div>
          <textarea
            onChange={handleInput}
            className="bg-adopdark w-full rounded-lg text-base"
            value={bodyData.description}
          ></textarea>

          {postdata && (
            <div className="flex justify-between text-sm p-5 mb-2">
              <div className="w-[300px] break-words ">{postdata.description } </div>
              <div className="w-[50%]">
                <img
                  className="rounded-lg h-[200px] mt-1 object-contain"
                  src={`https://pix.adoppix.com/public/${postdata.images[0]}`}
                />
              </div>
            </div>
          )}
        </div>
        <div className="flex justify-end items-center">
          <div
            onClick={handleOnClose}
            className="cursor-pointer text-base px-6 py-2 border-2 border-white text-white rounded-lg mr-2"
          >
            ยกเลิก
          </div>
          <div
            onClick={handleSubbmit}
            className="cursor-pointer text-base px-6 py-2 bg-adoppix text-white rounded-lg"
          >
            รายงาน
          </div>
        </div>
      </div>
    </div>
  );
}
