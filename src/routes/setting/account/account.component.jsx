import ModalChangeImage from "../../../components/setting/account/modal/userImage.change";
import ModalBannerChange from "../../../components/setting/account/modal/userbanner.change copy";
import React, { useState, useRef } from "react";
import { BsFillCameraFill } from "react-icons/bs";
import ElementMaker from "../../../components/setting/account/input/elementMarket";
import TextAreaMaker from "../../../components/setting/account/textarea/textAreaMarker";
const Account = () => {
  const [profileImageModal, setProfileImageModal] = useState(false);
  const handleOnClose = () => setProfileImageModal(false);

  const [bannerImageModal, setBannerImageModal] = useState(false);
  const handleBannerOnClose = () => setBannerImageModal(false);

  const [fullName, setFullName] = useState("ibestdk");
  const [showInputEle, setShowInputEle] = useState(false);
  const [description, setDescription] = useState(
    "สำหรับบรรยากาศภายใน ทางร้านอยากเน้นในทุก ๆ โซน แวดล้อมไปด้วยบรรยากาศสบาย ๆ และเป็นกันเองมากที่สุด จึงเลือกตกแต่งร้านด้วยโทนสีขาวเป็นหลัก เฟอร์นิเจอร์ไม้สีอ่อน"
  );

  const handleDescriptionOnClose = () => setDescription(false);
  const [showInputDescription, setShowInpuDescription] = useState(false);
  return (
    <div>
      <div className="relative">
        <div>
          <div className="relative">
            <div>
              <img
                className="shadow-lg rounded-b-2xl m-auto h-[300px]  w-full object-cover"
                src="https://pix.adoppix.com/public/368443ba-e19e-4207-85b3-d51bb8c5d401.jpg"
              ></img>
            </div>
            <div className="absolute top-0 left-0 text-4xl h-[300px]  w-full">
              <button
                className="h-[300px]  w-full hover:text-adoplighticon rounded-b-2xl hover:backdrop-blur-sm duration-700"
                onClick={() => setBannerImageModal(true)}
              >
                <BsFillCameraFill className="absolute shadow-[0px_0px_8px-solid-black]  left-[50%] top-[40%]  duration-300" />
              </button>
            </div>
          </div>
        </div>
        <div className="absolute top-52 left-24 border-[20px] rounded-full dark:border-adopdark border-adoplight shadow-lg">
          <div className="relative">
            <div>
              <img
                className="shadow-lg m-auto h-[180px]  w-[180px] rounded-full object-cover "
                src="https://pix.adoppix.com/public/1f535da9-d0ae-4519-b513-26e29c7cfde2.jpg"
              ></img>
            </div>
            <div className="absolute top-0 left-0 text-4xl w-[180px] h-[180px]">
              <button
                className="w-[180px] h-[180px] hover:text-adoplighticon rounded-full hover:backdrop-blur-sm duration-700"
                onClick={() => setProfileImageModal(true)}
              >
                <BsFillCameraFill className="absolute shadow-[0px_0px_8px-solid-black]  left-[40%] top-[40%]  duration-300" />
              </button>
            </div>
          </div>
        </div>
        <div className="absolute left-[30%]">
          <div>
            <ElementMaker
              value={fullName}
              handleChange={(e) => setFullName(e.target.value)}
              handleDoubleClick={() => setShowInputEle(true)}
              handleBlur={() => setShowInputEle(false)}
              showInputEle={showInputEle}
            />
          </div>
          <div>
            <TextAreaMaker
              value={description}
              onClose={handleDescriptionOnClose}
              handleChange={(e) => setDescription(e.target.value)}
              handleDoubleClick={() => setShowInpuDescription(true)}
              handleBlur={() => setShowInpuDescription(false)}
              showInputEle={showInputDescription}
            />
          </div>
        </div>
        <div className="absolute right-0">
          <button
            variant="outlined"
            className="py-2 px-6 bg-adoppix rounded-lg "
            disabled
          >
            บันทึก
          </button>
        </div>
      </div>
      <div>
        <div></div>
        <div>
          <ModalChangeImage
            onClose={handleOnClose}
            visible={profileImageModal}
          />
          <ModalBannerChange
            onClose={handleBannerOnClose}
            visible={bannerImageModal}
          />
        </div>
      </div>
    </div>
  );
};

export default Account;
