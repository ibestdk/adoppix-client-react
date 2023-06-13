import "./imagePreview.scss";
import React, { useState, useRef } from "react";
import ReactCrop, {
  centerCrop,
  makeAspectCrop,
  Crop,
  PixelCrop,
} from "react-image-crop";
import { BsFillImageFill, BsXCircle, BsChatSquare } from "react-icons/bs";
import { AiOutlineHeart } from "react-icons/ai";
import "react-image-crop/dist/ReactCrop.css";
import FileUploadSection from "../../../auction/auction-create/file-upload";
import Chips from "../../../input/chips/chips";

export default function ImagePreview({ visible, onClose, postData }) {
  //console.log(postData);

  const handleOnClose = (e) => {
    if (e.target.id === "modal-card") onClose();
  };

  if (!visible) return null;
  return (
    <div
      id="modal-card"
      onClick={handleOnClose}
      className="mt-10 animation-custom fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center duration-300"
    >
      <img
        className="rounded-lg  h-[90%] w-auto object-contain"
        src={`https://pix.adoppix.com/public/${postData.images[0]}`}
      />
    </div>
  );
}
