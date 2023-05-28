import React, { useState, useEffect, useRef } from "react";
import { getMyStorage } from "../../services/apiService";
import ImagePreview from "./imagePreview/imagePreview";
import { BsImages } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

export const StorageIndex = () => {
  const navigate = useNavigate();
  const [inventory, setInventory] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  useEffect(() => {
    (async () => {
      const results = await getMyStorage();
      //console.log("==========================");
      console.log(results);
      setInventory(results);
    })();
  }, []);

  const handleDownload = async (image) => {
    const response = await fetch(`https://pix.adoppix.com/public/${image}`);
    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = image;
    link.click();
    window.URL.revokeObjectURL(url);
  };

  useEffect(() => {
    console.log(selectedImage);
  }, [selectedImage]);
  return (
    <div>
      <div className="p-4 mt-4 bg-adoplight dark:bg-adopsoftdark  rounded-lg min-h-[200px] w-[75%] mx-auto">
        <div className="text-2xl font-bold flex justify-between">
          <div>คลังรูปภาพ</div>
          <div className="text-lg cursor-pointer hover:opacity-75 duration-300" onClick={() => navigate("../auction/history")}>ดูประวัติการประมูล</div>
          
        </div>
        <div className="text-lg p-2">มีทั้งหมด {inventory.length} รายการ</div>
        <div className="">
          {inventory.length > 0 ? (
            <div className="mt-3 grid sm:grid-cols-6 grid-cols-2 gap-4">
              {inventory.length > 0 &&
                inventory.map((item, index) => (
                  <div
                    key={index}
                    className=" hover:opacity-70 duration-300 cursor-pointer "
                    onClick={() => setSelectedImage(item)}
                  >
                    <img
                      className="h-[200px] rounded-lg w-[200px] bg-adopdark object-cover mx-1 "
                      src={`https://pix.adoppix.com/public/${item.image}`}
                    />
                    <div className="text-sm truncate">{item.title}</div>
                  </div>
                ))}
              <ImagePreview
                onClose={() => {
                  setSelectedImage(null);
                }}
                visible={false}
                data={selectedImage}
              />
            </div>
          ) : (
            <div className="flex flex-col justify-center items-center p-10">
              <BsImages className="text-4xl" />
              <div className="text-2xl font-bold ">ไม่พบรูปภาพ</div>
              <div className="text-xs opacity-60 text-center w-[200px]">
                Tip : คุณสามารถเพิ่มรูปภาพในคลังได้จากการประมูลและซื้อรูปภาพ
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
