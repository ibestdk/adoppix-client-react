import "./delete.scss";
import React, { useState, useRef } from "react";
import { BiSend } from "react-icons/bi";
import { BsEmojiSmile } from "react-icons/bs";

import "react-image-crop/dist/ReactCrop.css";
import EmojiPicker, { EmojiClickData } from "emoji-picker-react";
import { getUser } from "../../../../services/authorize";
import { deleteFeeds, postFeedsComment } from "../../../../services/feedsService";

export default function ModalPostDelete({
  onclose,
  postdata,
  onclear,
  visible,
  reloadFeeds,
}) {
  const [imgSrc, setImgSrc] = useState("");
  const [emoji, setEmoji] = useState(false);
  const [confrimModal, setConfrimModal] = useState(false);
  const [bodyData, setBodyData] = useState({ description: "" });
  const bodyDataRef = useRef(bodyData);

  function handleInput(event) {
    const value = event.target.value;
    setBodyData((prevBodyData) => {
      const newBodyData = { ...prevBodyData, description: value };
      bodyDataRef.current = newBodyData;
      return newBodyData;
    });
  }

  function onClick(emojiData: EmojiClickData, event: MouseEvent) {
    const emoji = String.fromCodePoint(parseInt(emojiData.unified, 16));
    bodyDataRef.current.description += emoji;
  }

  console.log(postdata);
  const userData = getUser();
  // console.log(userData.profileImage)
  const handleOnClose = (e) => {
    if (e.target.id === "modal-card") onclose();
  };
  const handleOnConfrim = (e) => {
    if (bodyData.description === "" && e.target.id === "modal-card") {
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
   const result = await deleteFeeds(postdata.postId);
    if(result === "Successful"){
      console.log("Success")
      onclear();
      reloadFeeds();
    }
  };

  if (!visible) return null;
  return (
    <div
      id="modal-card"
      onClick={() => onclear()}
      className="mt-10 animation-custom fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center duration-300"
    >
      {confrimModal && (
        <div
          id="modal-confirm"
          className="animation-custom fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center duration-300"
        >
          <div className="bg-adopsoftdark w-[400px] h-[200px] rounded-lg p-4 flex flex-col justify-between">
            <div>
              <div className="text-2xl font-bold">กดยืนยันอีกครั้งเพื่อทำการลบ</div>
              <div className="text-lg">
                เมื่อทำการยืนยันเเล้วจะไม่สามารถนำโพสต์นี้กลับมาได้อีกครั้ง
              </div>
            </div>
            <div className="flex justify-end items-end">
              <div
                onClick={() => setConfrimModal(false)}
                className="cursor-pointer mx-2 px-2 py-1 rounded-lg border-white border-2 text-base"
              >
                ย้อนกลับ
              </div>
              <div
                onClick={() => handleSubbmit()}
                className="cursor-pointer mx-2 px-2 py-1 rounded-lg bg-red-600 text-base"
              >
                ยืนยัน
              </div>
            </div>
          </div>
        </div>
      )}

      <div className=" dark:bg-adopsoftdark bg-adoplight w-[500px] p-4 rounded-lg animate-[wiggle_1s_ease-in-out_infinite]">
        <div className=" mb-5 text-2xl text-center font-bold">
          คุณต้องการลบโพสต์ใช่หรือไม่
        </div>
        <div className="">
          <div className="flex justify-between">
            <div className="flex">
              <div className="flex flex-col items-center">
                <div>
                  <img
                    className="rounded-full w-[40px] h-[40px] mx-2"
                    src={`https://pix.adoppix.com/public/${postdata.profileImage ? postdata.profileImage : "brushsan.png"}`}
                  />
                </div>
              </div>
              <div className="w-[280px]">
                <div className="text-lg font-bold inline-block align-middle my-auto mx-2">
                  {postdata.username}
                </div>
                <div className="text-lg px-2 py-3 break-words">{postdata.description}</div>
                <div className="my-2 flex-wrap flex break-words w-full">
                  {postdata.tags.length > 0 && (
                    <div className="flex flex-wrap">
                      {postdata.tags.map((tag, tagindex) => (
                        <div key={tagindex} className="inline-block">
                          <p className="text-sm px-2">#{tag}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="hover:brightness-75 duration-300 flex justify-center items-center">
              <img
                className="rounded-lg h-[130px] "
                src={`https://pix.adoppix.com/public/${postdata.images[0]}`}
              />
            </div>
          </div>
          <div className="flex mt-4 justify-end h-[40px] items-center">
           <div onClick={() => onclear()} className="cursor-pointer text-base px-8 py-2 rounded-lg border-2 border-white mr-2">ยกเลิก</div>
           <div onClick={() => handleSubbmit()} className="cursor-pointer text-base px-8 py-2 rounded-lg bg-red-600 text-white">ลบ</div>
          </div>
        </div>
      </div>
    </div>
  );
}
