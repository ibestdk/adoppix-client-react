import "./imagePreview.scss";
import React, { useState, useRef } from "react";
import { AiOutlineCloudDownload } from 'react-icons/ai';

export default function ImagePreview({ visible, onClose, data }) {
  const handleDownload = async () => {
    const response = await fetch(
      `https://pix.adoppix.com/public/${data.image}`
    );
    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = data.image;
    link.click();
    window.URL.revokeObjectURL(url);
  };
  const handleOnClose = (e) => {
    if (e.target.id === "modal-card") onClose();
  };

  if (!visible && data == null) return null;
  return (
    <div
      id="modal-card"
      onClick={handleOnClose}
      className="mt-10 animation-custom fixed inset-0 bg-black bg-opacity-30  backdrop-blur-sm flex justify-center items-center duration-300"
    >
      <div className="relative">
        <img
          className="rounded-lg  h-[90%] max-h-[90vh]  w-auto"
          src={`https://pix.adoppix.com/public/${data.image}`}
        />
        <AiOutlineCloudDownload onClick={handleDownload}  className="cursor-pointer absolute top-0 right-0 m-5 text-[2.5rem] p-1 shadow-lg bg-red-500 rounded-full z-50"/>
      </div >
    </div>
  );
}
