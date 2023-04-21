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

export default function ModalCreatePost({
  visible,
  onClose,
  reloadFeeds,
  setProfileImage,
  setProfileImage64,
}) {
  const [imgSrc, setImgSrc] = useState("");
  const previewCanvasRef = useRef<HTMLCanvasElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const [crop, setCrop] = useState<Crop>();
  const [completedCrop, setCompletedCrop] = useState<PixelCrop>();
  const [scale, setScale] = useState(1);
  const [rotate, setRotate] = useState(0);
  const [aspect, setAspect] = useState<number | undefined>(1 / 1);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [previewImages, setPreviewImages] = useState<string[]>([]);

  const [images, setImages] = useState<File[]>([]);
  const [tagsData, setTagsData] = useState([]);
  const [description, setDescription] = useState("");

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
    if (images)
      images.forEach((image) => bodyData.append("Images", image));

    if (description) bodyData.append("Description", description);
    if (tagsData) tagsData.forEach((tag) => bodyData.append("Tags", tag));
    console.log(FileList);
    console.log(bodyData);
    const token = getToken();
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
      "Access-Control-Allow-Origin": "*",
    };

    // ถ้าเป็น Promise (พวกใช้ .then ทั้งหลาย) แนะนำให้ใช้ await ไปเลย
    let result = await axios({
      method: "post",
      url: "https://api.adoppix.com/api/Post",
      data: bodyData,
      headers: headers,
    }).catch((err) => console.log(err.response));
    console.log(result);
    onClose();
    reloadFeeds();
  };

  const handleDescription = (e) => {
    setDescription(e.target.value);
  };

  if (!visible) return null;
  return (
    <div
      id="modal-card"
      onClick={handleOnClose}
      className="animation-custom fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center duration-300"
    >
      <div className=" dark:bg-adopsoftdark bg-adoplight w-[500px] p-4 rounded-lg animate-[wiggle_1s_ease-in-out_infinite]">
        <div className="py-2 border-b-4 dark:border-adopdark border-adoplighticon">
          <h2 className="dark:text-adoplight text-adopdark text-xl p-2 text-center">
            สร้างโพสต์
          </h2>
        </div>
        <div
          id="body"
          className="min-h-[250px] py-2 border-b-4 dark:border-adopdark border-adoplighticon"
        >
          <div className="mt-2">
            <textarea
              onChange={handleDescription}
              className="dark:bg-adopsoftdark rounded-lg w-full h-auto focus:outline-none focus:border-none"
              name=""
              id=""
            ></textarea>
          </div>
          <div className="mt-2">
            <label htmlFor="">เเท็ก</label>
            <div className="mt-2">
              <Chips tagsData={tagsData} setTagsData={setTagsData} />
            </div>
          </div>
          <div className="mt-2">
            <div>
              <div
                className="overflow-y-hidden"
                style={{ display: "flex", overflowX: "auto" }}
              >
                {previewImages.map((image, index) => (
                  <div key={index} style={{ margin: "0 8px" }}>
                    <div className="relative h-[120px] w-auto ">
                      <img
                        className="rounded-lg h-full shadow-lg object-contain"
                        src={image}
                        alt="Selected file preview"
                        width="200"
                      />
                      <div className="absolute top-1 right-1">
                        <button onClick={() => handleRemoveImage(index)}>
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
              className="mx-2 bg-adoplighticon py-2 px-4 rounded-lg"
              onClick={onClose}
            >
              ยกเลิก
            </button>
            <button
              className="mx-2 bg-adoppix py-2 px-4 rounded-lg"
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
