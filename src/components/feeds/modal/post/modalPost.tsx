import "./modalPost.scss";
import React, { useState, useRef } from "react";
import { BiSend } from "react-icons/bi";
import { BsEmojiSmile } from "react-icons/bs";

import "react-image-crop/dist/ReactCrop.css";
import EmojiPicker, { EmojiClickData } from "emoji-picker-react";
import { getUser } from "../../../../services/authorize";
import { postFeedsComment } from "../../../../services/feedsService";

export default function ModalPost({ visible, onClose, postData }) {
  if (!visible) return null;

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

  console.log(postData);
  const userData = getUser();
  // console.log(userData.profileImage)
  const handleOnClose = (e) => {
    if (e.target.id === "modal-card") onClose();
  };
  const handleOnConfrim = (e) => {
    if (bodyData.description === "" && e.target.id === "modal-card") {
      onClose();
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
   const result = await postFeedsComment(postData.postId, bodyData);
   if(result === "Successful" ){
    onClose();
   }
  };

  return (
    <div
      id="modal-card"
      onClick={handleOnConfrim}
      className="mt-10 animation-custom fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center duration-300"
    >
      {confrimModal && (
        <div
          id="modal-confirm"
          className="animation-custom fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center duration-300"
        >
          <div className="bg-adopsoftdark w-[400px] h-[200px] rounded-lg p-4 flex flex-col justify-between">
            <div>
              <div className="text-2xl font-bold">การยกเลิกข้อความ?</div>
              <div className="text-lg">
                เมื่อกดออกเเล้วข้อความที่คุณพิมพ์ไว้ก่อนหน้าจะหายไป.{" "}
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
                onClick={() => onClose()}
                className="cursor-pointer mx-2 px-2 py-1 rounded-lg bg-red-600 text-base"
              >
                ยกเลิก
              </div>
            </div>
          </div>
        </div>
      )}

      <div className=" dark:bg-adopsoftdark bg-adoplight w-[500px] overflow-clip p-4 rounded-lg animate-[wiggle_1s_ease-in-out_infinite]">
        <div className="">
          <div className="flex justify-between">
            <div className="flex">
              <div className="flex flex-col items-center min-w-[60px]">
                <div>
                  <img
                    className="rounded-full w-[40px] h-[40px] mx-2"
                    src={`https://pix.adoppix.com/public/${postData.profileImage ? postData.profileImage : "brushsan.png"}`}
                  />
                </div>
                <div className="relative h-[80%]">
                  <div className="border-l-2 min-h-[60px] h-[100%] left-[50%]absolute mt-2 dark:border-adoplighticon"></div>
                </div>
              </div>
              <div className="w-[300px]">
                <div className="text-lg font-bold inline-block align-middle my-auto mx-2">
                  {postData.username}
                </div>
                <div className="text-lg px-2 py-3 break-words w-full">{postData.description}</div>
                <div className="my-2 flex-wrap flex break-words w-full">
                  {postData.tags.length > 0 && (
                    <div className="flex flex-wrap">
                      {postData.tags.map((tag, tagindex) => (
                        <div key={tagindex} className="inline-block">
                          <p className="text-sm px-2">#{tag}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="hover:brightness-75 duration-300 flex justify-center items-center ">
              <img
                className="rounded-lg h-[150px] object-contain"
                src={`https://pix.adoppix.com/public/${postData.images[0]}`}
              />
            </div>
          </div>
          <div className="flex mt-2">
            <div className="mx-2">
              <img
                className="rounded-full border-2 w-[45px] h-[45px] p-1 bg-adoplight dark:bg-adopsoftdark border-adoppix outline-adoppix"
                src={`https://pix.adoppix.com/public/${
                  userData.profileImage ? userData.profileImage : "brushsan.png"
                }`}
              />
            </div>
            <div className="w-[90%]">
              <textarea placeholder="เขียนบางสิ่ง . . ."
                value={bodyData.description}
                onChange={handleInput}
                className="rounded-lg dark:bg-adopdark w-full hover:outline-none hover:border-none border-0 min-h-[200px]"
              />
              <div>
                <div className="mt-2 flex justify-between relative">
                  <div className="">
                    <div>
                      <BsEmojiSmile
                        onClick={() => setEmoji(!emoji)}
                        className="cursor-pointer"
                      />
                    </div>
                    {emoji && (
                      <div
                        id="modal-emoji"
                        className={`absolute top-0 left-10`}
                      >
                        <div className="relative">
                          <div
                            className="top-[500px] animation-custom fixed left-20 right-0 bottom-[-40px]  bg-red bg-opacity-30 flex justify-center items-end duration-300"
                            onClick={handleOnClickOutsideEmojiPicker}
                          >
                            <EmojiPicker
                              skinTonesDisabled
                              searchPlaceHolder="ค้นหาอีโมจิ"
                              height={350}
                              searchDisabled
                              onEmojiClick={onClick}
                              autoFocusSearch={false}
                            />
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  <div
                    onClick={handleSubbmit}
                    className="bg-adoppix text-white py-2 px-4 rounded-lg flex items-center text-sm"
                  >
                    <div className="pr-2 cursor-pointer">ส่ง</div>
                    <BiSend />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
