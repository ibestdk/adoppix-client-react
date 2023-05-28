import "./modalCreate.scss";
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
import { postQnA } from "../../../services/questionService";


export default function AddQnA({ visible, onClose, reloadFeeds }) {
  const [newBank, setNewBank] = useState({
    username: "",
    title: "",
    description: "",
  });

  const typeTitle = (e) => {
    setNewBank((prevBank) => ({
      ...prevBank,
      title: e.target.value,
    }));
  };

  const typeDescription = (e) => {
    setNewBank((prevBank) => ({
      ...prevBank,
      description: e.target.value,
    }));
  };



  const handleOnClose = (e) => {
    if (e.target.id === "modal-card") onClose();
  };

  const handleSubmit = async () => {
    console.log(newBank)
    const result = await postQnA(newBank);
    console.log(result);
    reloadFeeds();
    setNewBank({
      username: "",
      title: "",
      description: "",
    });
    onClose();
  };

  const calledUser = async () => {
    const user = await getUser();
    setNewBank((prevBank) => ({
      ...prevBank,
      username: user.username,
    }));
  };

  useEffect(() => {
    calledUser();
  }, []);

  if (!visible) return null;
  return (
    <div
      id="modal-card"
      onClick={handleOnClose}
      className="animation-custom fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center  duration-300"
    >
      <div className=" dark:bg-adopsoftdark bg-adoplight w-[500px] p-4 rounded-lg animate-[wiggle_1s_ease-in-out_infinite] max-h-[600px] overflow-y-scroll">
        <div>เพิ่มคำถามใหม่</div>
        <div className="flex flex-col space-y-4 m-2">
          <div className="flex flex-col">
            <label className="text-lg" htmlFor="">
              หัวข้อ
            </label>
            <input
              type="text"
              className="bg-adopdark rounded-lg text-white my-2"
              value={newBank.title}
              onChange={typeTitle}
            />
          </div>
          <div className="flex flex-col">
            <label className="text-lg" htmlFor="">
              เนื้อหา
            </label>
            <textarea value={newBank.description} onChange={typeDescription} className="bg-adopdark rounded-lg h-[150px]" >


            </textarea>
          </div>
         
        </div>
        <div className="flex justify-end items-center space-x-2">
          <div
            onClick={handleOnClose}
            className="py-2 px-6 border-2 border-white rounded-lg text-white text-lg hover:opacity-75 duration-300"
          >
            ยกเลิก
          </div>
          <div
            onClick={handleSubmit}
            className="py-2 px-6 bg-adoppix rounded-lg text-white text-lg cursor-pointer hover:opacity-75 duration-300"
          >
            เพิ่ม
          </div>
        </div>
      </div>
    </div>
  );
}
