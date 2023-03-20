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
  const [tagsData, setTagsData] = useState([]);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
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
  const canvasToBase64 = () => {
    const base64 = previewCanvasRef.current?.toDataURL("image/jpeg");
    // const canvas = document.createElement("canvas");
    console.log(base64);
    // const base64Image = canvas.toDataURL("image/jpeg");
    // setImageOutput(canvas);
    // console.log(base64Image);
    const file = dataURLtoFile(base64, "test.jpg");
    setProfileImage(file);
    setProfileImage64(base64);
    console.log(file);
    onClose();
  };

  function dataURLtoFile(dataurl, filename) {
    var arr = dataurl.split(","),
      mime = arr[0].match(/:(.*?);/)[1],
      bstr = window.atob(arr[1]),
      n = bstr.length,
      u8arr = new Uint8Array(n);

    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }

    return new File([u8arr], filename, { type: mime });
  }

  function onSelectFile(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files && e.target.files.length > 0) {
      setCrop(undefined); // Makes crop preview update between images.
      const reader = new FileReader();
      reader.addEventListener("load", () =>
        setImgSrc(reader.result?.toString() || "")
      );
      reader.readAsDataURL(e.target.files[0]);
    }
  }

  function onImageLoad(e: React.SyntheticEvent<HTMLImageElement>) {
    if (aspect) {
      const { width, height } = e.currentTarget;
      setCrop(centerAspectCrop(width, height, aspect));
    }
  }

  function handleToggleAspectClick() {
    if (aspect) {
      setAspect(undefined);
    } else if (imgRef.current) {
      const { width, height } = imgRef.current;
      setAspect(16 / 9);
      setCrop(centerAspectCrop(width, height, 16 / 9));
    }
  }

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
                    <div className="relative h-[80px] w-auto">
                      <img
                        className="rounded-lg h-full shadow-lg"
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
              onClick={canvasToBase64}
            >
              บันทึก
            </button>
          </div>
        </div>
        
      </div>
    </div>
  );
}
