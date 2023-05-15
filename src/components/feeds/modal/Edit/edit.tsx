import "./edit.scss";
import React, { useState, useRef, useEffect } from "react";
import { BiSend } from "react-icons/bi";
import { BsEmojiSmile } from "react-icons/bs";

import "react-image-crop/dist/ReactCrop.css";
import EmojiPicker, { EmojiClickData } from "emoji-picker-react";
import { getUser } from "../../../../services/authorize";
import { postFeedsComment, putFeeds } from "../../../../services/feedsService";
import Chips from "../../../input/chips/chips";

export default function ModalEditPost({
  onclose,
  postdata,
  onClear,
  visible,
  reloadFeeds,
}) {
  const [emoji, setEmoji] = useState(false);
  const [confrimModal, setConfrimModal] = useState(false);
  const [bodyData, setBodyData] = useState({
    Description: "",
    currentImages: [],
    newImages: [],
    Tags: [],
  });
  const [tagsData, setTagsData] = useState([]);
  const bodyDataRef = useRef(bodyData);

  function handleInput(event) {
    const value = event.target.value;
    setBodyData((prevBodyData) => {
      const newBodyData = { ...prevBodyData, Description: value };
      bodyDataRef.current = newBodyData;
      return newBodyData;
    });
  }

  console.log(postdata);
  const userData = getUser();
  // console.log(userData.profileImage)
  const handleOnClose = (e) => {
    if (e.target.id === "modal-card") onclose();
  };
  const handleOnConfrim = (e) => {
    if (bodyData.Description === "" && e.target.id === "modal-card") {
      onclose();
    }
    if (e.target.id === "modal-card") setConfrimModal(!confrimModal);
  };
  // const handleCloseConfrim = (e) => {
  //   console.log("handleCloseConfrim called")
  //   if (e.target.id === "modal-confirm") setConfrimModal(false);
  // };

  const handleOnClickOutsideEmojiPicker = (e) => {
    setEmoji(false);
  };

  const handleSubbmit = async () => {
    await setBodyData((prevState) => ({
      ...prevState,
      Tags: tagsData,
    }));
    // console.log("submit", bodyData);
    const result = await putFeeds(postdata.postId, bodyData);
    if(result === "Successful"){
      console.log("Success")
      onclose();
      reloadFeeds();
    }
  };

  useEffect(() => {
    setBodyData({
      Description: postdata.description,
      Tags: [],
      currentImages: postdata.images,
      newImages: [],
    });
    setTagsData(postdata.tags);
    console.log(bodyData);
  }, [postdata]);

  useEffect(() => {
    setBodyData((prevState) => ({
      ...prevState,
      Tags: tagsData,
    }));

    console.log(bodyData);
  }, [tagsData]);

  if (!visible) return null;
  return (
    <div
      id="modal-card"
      onClick={handleOnConfrim}
      className="mt-10 animation-custom fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center duration-300"
    >
      <div className=" dark:bg-adopsoftdark bg-adoplight w-[500px] p-4 rounded-lg animate-[wiggle_1s_ease-in-out_infinite]">
        <div className="text-2xl font-bold my-2 text-center">แก้ไขโพสต์</div>
        <div>
          <textarea
            onChange={handleInput}
            className="bg-adopdark w-full rounded-lg text-base"
            value={bodyData.Description}
          ></textarea>

          <div className="mt-2">
            <Chips tagsData={tagsData} setTagsData={setTagsData} />
          </div>
          <img
            className="rounded-lg h-[200px] mt-1"
            src={`https://pix.adoppix.com/public/${bodyData.currentImages[0]}`}
          />
        </div>
        <div className="flex justify-end items-center">
          <div
            onClick={onclose}
            className="cursor-pointer text-base px-6 py-2 border-2 border-white text-white rounded-lg mr-2"
          >
            ยกเลิก
          </div>
          <div
            onClick={handleSubbmit}
            className="cursor-pointer text-base px-6 py-2 bg-adoppix text-white rounded-lg"
          >
            บันทึก
          </div>
        </div>
      </div>
    </div>
  );
}
