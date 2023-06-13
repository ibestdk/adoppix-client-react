import "./modalreply.scss";
import React, { useState, useEffect } from "react";
import ReactCrop, {
  centerCrop,
  makeAspectCrop,
  Crop,
  PixelCrop,
} from "react-image-crop";
import { BsFillImageFill, BsXCircle } from "react-icons/bs";
import "react-image-crop/dist/ReactCrop.css";
import { getUser } from "../../../services/authorize";
import { postQnA, postReply, replyQa } from "../../../services/questionService";
import { ImCancelCircle } from "react-icons/im";

export default function ReplayQnA({ visible, onClose, reloadFeeds, data }) {
  const [bodyData, setBodyData] = useState({
    message: "",
  });
  console.log(data);
  const typeMessage = (e) => {
    setBodyData((prevBank) => ({
      ...prevBank,
      message: e.target.value,
    }));
  };

  const handleOnClose = (e) => {
    if (e.target.id === "modal-card") onClose();
  };

  const handleSubmit = async () => {
    console.log(bodyData);
    console.log(data.id);

    const result = await postReply(data.id, bodyData);
    console.log(result);
    reloadFeeds();
    setBodyData({
      message: "",
    });
  };


  useEffect(() => {

  }, []);

  if (!visible) return null;
  return (
    <div
      id="modal-card"
      onClick={handleOnClose}
      className="animation-custom fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center  duration-300"
    >
      <div className=" dark:bg-adopsoftdark bg-adoplight w-[600px] p-4 rounded-lg animate-[wiggle_1s_ease-in-out_infinite]  m-5">
        <div>
          <div className="flex justify-between items-center">
            <div>{data && data.title}</div>
            <div
              onClick={onClose}
              className="flex justify-end items-center space-x-2"
            >
              <ImCancelCircle />
            </div>
          </div>
        </div>

        <div className="overflow-y-scroll max-h-[300px] m-5 text-lg">
          {data.replies.length > 0 ? (
            <div>
              {data.replies.map((reply, index) => (
                <div key={index} className="mt-4">
                  <div className="flex ">
                    <p className="font-bold text-white mr-2 whitespace-nowrap">
                      {reply.username} :
                    </p>
                    <p className="">{reply.message}</p>
                  </div>
                  <p className="text-sm text-gray-400 mt-1">{reply.createAt}</p>
                </div>
              ))}
            </div>
          ) : (
            <div>ยังไม่มีข้อความตอบกลับ</div>
          )}
        </div>
        <div className="flex space-x-2 m-2">
          <div className="flex w-[100%]">
            <input
              type="text"
              className="bg-adopdark rounded-lg text-white my-2 w-[100%]"
              value={bodyData.message}
              onChange={typeMessage}
            />
          </div>
          <div
            onClick={handleSubmit}
            className="py-2 px-6 bg-adoppix rounded-lg text-white text-lg cursor-pointer hover:opacity-75 duration-300 my-2 w-[80px] h-[40px]"
          >
            ส่ง
          </div>
        </div>
      </div>
    </div>
  );
}
