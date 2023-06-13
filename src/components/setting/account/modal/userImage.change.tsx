import "./UserImageChange.scss";
import React, { useState, useRef } from "react";
import ReactCrop, {
  centerCrop,
  makeAspectCrop,
  Crop,
  PixelCrop,
} from "react-image-crop";
import { canvasPreview } from "./canvasPreview";
import "react-image-crop/dist/ReactCrop.css";
import { imgPreview } from "./imgPreview";
import { useDebounceEffect } from "./useDebounceEffect";

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




export default function ModalChangeImage({ visible, onClose ,setProfileImage,setProfileImage64}) {
  const [imgSrc, setImgSrc] = useState("");
  const previewCanvasRef = useRef<HTMLCanvasElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const [crop, setCrop] = useState<Crop>();
  const [completedCrop, setCompletedCrop] = useState<PixelCrop>();
  const [scale, setScale] = useState(1);
  const [rotate, setRotate] = useState(0);
  const [aspect, setAspect] = useState<number | undefined>(1 / 1);

  const canvasToBase64 = () => {
    const base64 = previewCanvasRef.current?.toDataURL("image/jpeg");
    // const canvas = document.createElement("canvas");
    //console.log(base64);
    // const base64Image = canvas.toDataURL("image/jpeg");
    // setImageOutput(canvas);
    // //console.log(base64Image);
    const file = dataURLtoFile(base64, "test.jpg");
    setProfileImage(file);
    setProfileImage64(base64);
    //console.log(file);
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

  useDebounceEffect(
    async () => {
      if (
        completedCrop?.width &&
        completedCrop?.height &&
        imgRef.current &&
        previewCanvasRef.current
      ) {
        // We use canvasPreview as it's much faster than imgPreview.
        canvasPreview(
          imgRef.current,
          previewCanvasRef.current,
          completedCrop,
          scale,
          rotate
        );
      }
    },
    100,
    [completedCrop, scale, rotate]
  );

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
      <div className=" dark:bg-adopsoftdark bg-adoplight w-[800px] p-4 rounded-lg animate-[wiggle_1s_ease-in-out_infinite]">
        <div className="py-2 border-b-4 dark:border-adopdark border-adoplighticon">
          <h2 className="dark:text-adoplight text-adopdark text-2xl p-2">
            เปลี่ยนรูปภาพโปรไฟล์
          </h2>
        </div>
        <div
          id="body"
          className="min-h-[450px] py-2 border-b-4 dark:border-adopdark border-adoplighticon"
        >
          <div className="mt-2">
            <div className="Crop-Controls">
              <input type="file" accept="image/*" onChange={onSelectFile} />
            </div>
            <div className="flex mt-6">
              <div className="mr-8 w-[450px] ">
                <div className="mb-4">
                  <h2 className="text-2xl">Crop Image</h2>
                </div>
                <div className="shadow-lg border-2 min-h-[200px] rounded-lg">
                  {!!imgSrc && (
                    <ReactCrop
                      crop={crop}
                      onChange={(_, percentCrop) => setCrop(percentCrop)}
                      onComplete={(c) => setCompletedCrop(c)}
                      aspect={aspect}
                    >
                      <img
                        className="rounded-lg"
                        ref={imgRef}
                        alt="Crop me"
                        src={imgSrc}
                        style={{
                          transform: `scale(${scale}) rotate(${rotate}deg)`,
                        }}
                        onLoad={onImageLoad}
                      />
                    </ReactCrop>
                  )}
                </div>
              </div>
              <div className="mx-5 w-[250px] h-[250px] rounded-full">
                <div className="mb-4">
                  <h2 className="text-2xl">รูปตัวอย่างโปรไฟล์</h2>
                </div>
                <div>
                  {!!completedCrop && (
                    <canvas
                      className="rounded-full w-[250px] h-[250px] "
                      ref={previewCanvasRef}
                      style={{
                        border: "1px solid black",
                        objectFit: "contain",
                        width: completedCrop.width,
                        height: completedCrop.height,
                      }}
                    />
                  )}
                </div>
              </div>
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
