import "./modalCreate.scss";
import React, { useState, useRef } from "react";
import ReactCrop, {
  centerCrop,
  makeAspectCrop,
  Crop,
  PixelCrop,
} from "react-image-crop";
import { BsFillImageFill, BsXCircle } from "react-icons/bs";
import "react-image-crop/dist/ReactCrop.css";
import FileUploadSection from "../../../auction/auction-create/file-upload";
import Chips from "../../../input/chips/chips";
import { getToken } from "../../../../services/authorize";
import axios from "axios";
import { createNewPost } from "../../../../services/feedsService";

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

export default function ModalCreatePost({ visible, onClose, reloadFeeds }) {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [previewImages, setPreviewImages] = useState<string[]>([]);

  const [images, setImages] = useState<File[]>([]);
  const [tagsData, setTagsData] = useState([]);
  const [description, setDescription] = useState("");
  const maxLength = 430;

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    console.log(files);
    if (files) {
      const fileList = Array.from(files);
      setImages(fileList);
    }
    if (files) {
      const selectedFilesArray = Array.from(files);
      setSelectedFiles(selectedFiles.concat(selectedFilesArray));
      const previewImagesArray = selectedFilesArray.map((file) =>
        URL.createObjectURL(file)
      );
      setPreviewImages(previewImages.concat(previewImagesArray));
    }
  };

  const handleRemoveImage = (index: number) => {
    const updatedSelectedFiles = [...selectedFiles];
    updatedSelectedFiles.splice(index, 1);
    setSelectedFiles(updatedSelectedFiles);

    const updatedPreviewImages = [...previewImages];
    updatedPreviewImages.splice(index, 1);
    setPreviewImages(updatedPreviewImages);
  };

  const handleOnClose = (e) => {
    if (e.target.id === "modal-card") onClose();
  };

  const handleSubmit = async () => {
    const bodyData = new FormData();
    if (images) images.forEach((image) => bodyData.append("Images", image));

    if (description) bodyData.append("Description", description);
    if (tagsData) tagsData.forEach((tag) => bodyData.append("Tags", tag));
    console.log(FileList);
    console.log(bodyData);

    const result = await createNewPost(bodyData);
    if(result === "Successful"){
      setImages([]);
      setTagsData([]);
      setDescription("");
      setPreviewImages([]);
      setSelectedFiles([]);
      onClose();
      reloadFeeds();
    }
  };

  const handleDescription = (e) => {
    setDescription(e.target.value);
  };

  if (!visible) return null;
  return (
    <div
      id="modal-card"
      onClick={handleOnClose}
      className="animation-custom fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center  duration-300"
    >
      <div className=" dark:bg-adopsoftdark bg-adoplight w-[500px] p-4 rounded-lg animate-[wiggle_1s_ease-in-out_infinite] max-h-[600px] overflow-y-scroll">
        <div className="py-1 ">
          <h2 className="dark:text-adoplight text-adopdark text-2xl font-bold p-2 text-center">
            สร้างโพสต์
          </h2>
        </div>
        <div id="body" className="min-h-[250px] py-2 ">
          <div className="mt-2 ">
            <textarea placeholder="เขียนบางสิ่ง . . ." 
              onChange={handleDescription} maxLength={maxLength}
              className="dark:bg-adopdark rounded-lg w-full min-h-[150px] focus:outline-none focus:border-none"
              name=""
              id=""
            ></textarea>
                  <p className="text-xs text-end">
        {description.length}/{maxLength}
      </p>
          </div>
          <div className="mt-2">
            <label htmlFor="">เเท็ก</label>
            <div className="mt-2">
              <Chips tagsData={tagsData} setTagsData={setTagsData} />
            </div>
          </div>
          <div className="mt-2 ">
            <div className="top-0 m-5 flex">
              <div className="flex overflow-x-auto overflow-y-hidden space-x-2">
                {previewImages.map((image, index) => (
                  <div key={index} className="flex-shrink-0 rounded-lg w-auto" >
                    <div className="relative">
                      <img
                        className="h-[220px] w-auto rounded-lg  object-contain hover:opacity-80 duration-200"
                        src={image}
                        alt="Selected file preview"
                        width="200"
                      />
                      <div className="absolute top-1 right-1">
                        <button className="drop-shadow-lg p-1 text-lg bg-red-400 rounded-full" onClick={() => handleRemoveImage(index)}>
                          <BsXCircle />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="p-5 hover:opacity-70 duration-150">
              <label htmlFor="file-input">
                <BsFillImageFill />
              </label>
              <input
                className="hidden"
                id="file-input"
                type="file"
                multiple
                onChange={handleFileSelect}
              />
            </div>
          </div>
        </div>
        <div id="footer" className="flex mt-2 relative min-h-[40px]">
          <div className="absolute right-0">
            <button
              className="mx-2 border-2 border-white text-base py-2 px-4 rounded-lg"
              onClick={onClose}
            >
              ยกเลิก
            </button>
            <button
              className="mx-2 bg-adoppix py-2 px-10 text-base rounded-lg"
              onClick={handleSubmit}
            >
              โพสต์
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
