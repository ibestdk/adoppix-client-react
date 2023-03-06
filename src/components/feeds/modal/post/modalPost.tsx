import "./modalPost.scss";
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


export default function ModalPost({
  visible,
  onClose,
  postData,
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
  const [tagsData, setTagsData] = useState([]);
console.log(postData)

  const handleOnClose = (e) => {
    if (e.target.id === "modal-card") onClose();
  };

  if (!visible) return null;
  return (
    <div
      id="modal-card"
      onClick={handleOnClose}
      className="animation-custom fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center duration-300"
    >
      <div className=" dark:bg-adopsoftdark bg-adoplight w-[500px] p-4 rounded-lg animate-[wiggle_1s_ease-in-out_infinite]">
       
      <div className="">
                      <div>
                        <div className="flex">
                          <div>
                            <img
                              className="rounded-full w-[40px] h-[40px] "
                              src={`https://pix.adoppix.com/public/${postData.profileImage}`}
                            />
                          </div>
                          <div className="text-lg font-bold inline-block align-middle my-auto mx-2">
                            {postData.username}
                          </div>
                        </div>
                        <div>
                          <div className="text-lg px-2 py-3">
                            {postData.description}
                          </div>
                          <div className="my-2">
                            {postData.tags.length > 0 && (
                              <div className="flex">
                                {postData.tags.map((tag, tagindex) => (
                                  <div key={tagindex}>
                                    <p className="text-sm px-2">#{tag}</p>
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="hover:brightness-75 duration-300">
                        <img
                          className="rounded-lg w-full "
                          src={`https://pix.adoppix.com/public/${postData.images[0]}`}
                        />
                      </div>
                      <div className="mt-2 flex">
                        <div>
                          <AiOutlineHeart />
                        </div>
                        <div className="mx-4 text-xl pt-1">
                          <div >
                            <BsChatSquare />
                          </div>
                        </div>
                      </div>
                    </div>

      </div>
    </div>
  );
}
