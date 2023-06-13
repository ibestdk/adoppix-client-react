import "./modalCreate.scss";
import bankData from "./bank.json";
import React, { useState, useRef } from "react";
import ReactCrop, {
  centerCrop,
  makeAspectCrop,
  Crop,
  PixelCrop,
} from "react-image-crop";
import { BsFillImageFill, BsXCircle } from "react-icons/bs";
import "react-image-crop/dist/ReactCrop.css";

import { getToken } from "../../../../services/authorize";
import axios from "axios";
import { createNewPost } from "../../../../services/feedsService";
import { postBank } from "../../../../services/bankService";

function centerAspectCrop(
  mediaWidth: number,
  mediaHeight: number,
  aspect: number
) {
  return centerCrop(
    makeAspectCrop(
      {
        unit: "%",
        width: 100,
      },
      aspect,
      mediaWidth,
      mediaHeight
    ),
    mediaWidth,
    mediaHeight
  );
}

export default function AddNewBank({ visible, onClose, reloadFeeds }) {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [previewImages, setPreviewImages] = useState<string[]>([]);

  const [images, setImages] = useState<File[]>([]);
  const [tagsData, setTagsData] = useState([]);
  const [newBank, setNewBank] = useState({
    bankName: "",
    number: "",
    fullName: "",
  });

  const typeFullNname = (e) => {
    setNewBank((prevBank) => ({
      ...prevBank,
      fullName: e.target.value,
    }));
  };

  const typeNumber = (e) => {
    setNewBank((prevBank) => ({
      ...prevBank,
      number: e.target.value,
    }));
  };

  const typeBankName = (e) => {
    setNewBank((prevBank) => ({
      ...prevBank,
      bankName: e.target.value,
    }));
  };

  const handleOnClose = (e) => {
    if (e.target.id === "modal-card") onClose();
  };

  const handleSubmit = async () => {
    const result = await postBank(newBank);
    console.log(result);
    reloadFeeds();
    setNewBank({
      bankName: "",
      number: "",
      fullName: "",
    });
    onClose();
  };
  if (!visible) return null;
  return (
    <div
      id="modal-card"
      onClick={handleOnClose}
      className="animation-custom fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center  duration-300"
    >
      <div className=" dark:bg-adopsoftdark bg-adoplight w-[500px] p-4 rounded-lg animate-[wiggle_1s_ease-in-out_infinite] max-h-[600px] overflow-y-scroll">
        <div>เพิ่มธนาคารใหม่</div>
        <div className="flex flex-col space-y-4 m-2">
          <div className="flex flex-col">
            <label className="text-lg" htmlFor="">
              หมายเลขบัญชี
            </label>
            <input
              type="text"
              className="bg-adopdark rounded-lg text-white my-2"
              value={newBank.number}
              onChange={typeNumber}
            />
          </div>
          <div className="flex flex-col">
            <label className="text-lg" htmlFor="bankName">
              ชื่อธนาคาร
            </label>
            <select
              id="bankName"
              className="bg-adopdark rounded-lg text-white my-2"
              value={newBank.bankName}
              onChange={typeBankName}
            >
              <option value="">เลือกธนาคาร</option>
              {bankData.banks.map((bank) => (
                <option key={bank.abbreviation} value={bank.name}>
                  {bank.name}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-col">
            <label className="text-lg" htmlFor="">
              ชื่อเจ้าของบัญชี
            </label>
            <input
              type="text"
              className="bg-adopdark rounded-lg text-white my-2"
              value={newBank.fullName}
              onChange={typeFullNname}
            />
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
