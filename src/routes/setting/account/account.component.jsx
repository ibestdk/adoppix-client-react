import ModalChangeImage from "../../../components/setting/account/modal/userImage.change";
import ModalBannerChange from "../../../components/setting/account/modal/userbanner.change copy";
import React, { useState, useRef, useEffect } from "react";
import { BsFillCameraFill } from "react-icons/bs";
import ElementMaker from "../../../components/setting/account/input/elementMarket";
import TextAreaMaker from "../../../components/setting/account/textarea/textAreaMarker";
import axios from "axios";
import { getToken, getUserDataApi } from "../../../services/authorize";
import { CircularProgress } from "@mui/material";
const Account = () => {
  const [profileImageModal, setProfileImageModal] = useState(false);
  const handleOnClose = () => setProfileImageModal(false);

  const [bannerImageModal, setBannerImageModal] = useState(false);
  const handleBannerOnClose = () => setBannerImageModal(false);
  //user data from local
  const [userNameLocal, setUserNameLocal] = useState();
  const [descriptionLocal, setDescriptionLocal] = useState();
  const [profileImageLocal, setProfileImageLocal] = useState();
  const [coverImageLocal, setCoverImageLocal] = useState();

  const [userName, setUserName] = useState();
  const [description, setDescription] = useState();

  const [profileImage, setProfileImage] = useState();
  const [profileImage64, setProfileImage64] = useState();
  const [coverImage, setCoverImage] = useState();
  const [coverImage64, setCoverImage64] = useState();

  const [showInputEle, setShowInputEle] = useState(false);
  const [isSave, setisSave] = useState(false);

  const handleDescriptionOnClose = () => setDescription(false);
  const [showInputDescription, setShowInpuDescription] = useState(false);

  const handleSubmit = () => {
    setisSave(true);
    // event.preventDefault();
    // const data = new FormData(event.currentTarget);
    // //console.log({
    //   Username: userName,
    //   Description: description,
    //   // ProfileImage: data.get("password"),
    //   CoverImage: coverImage,
    // });

    const jsonData = {};

    // let userName = {
    //   Username: userName,
    // };
    // let descriptionData = {
    //   Description: description,
    // };
    // let profileImageData = {
    //   ProfileImage: coverImage,
    // };
    // let coverImageData = {
    //   CoverImage: coverImage,
    // };

    if (userName) {
      jsonData.Username = userName;
    }
    if (description) {
      jsonData.Description = description;
    }
    if (profileImage) {
      jsonData.ProfileImage = profileImage;
    }
    if (coverImage) {
      jsonData.CoverImage = coverImage;
    }
    //console.log(jsonData);
    const token = getToken();
    const body = jsonData;
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
      "Access-Control-Allow-Origin": "*",
    };
    axios.put("https://api.adoppix.com/api/User", body, { headers });

    setTimeout(() => {
      getUserDataApi(token);
      setisSave(false);
    }, 2000);
    const newUserData = localStorage.getItem("user");
    // setUserName(newUserData.username);
    // setDescription(newUserData.description);
    // setCoverImage64(newUserData)
    // setProfileImage64(newUserData)

    // fetch("https://api.adoppix.com/api/User", {
    //   method: "PUT",
    //   headers: {
    //     "Content-Type": "application/json",
    //     "Access-Control-Allow-Origin": "*",
    //   },
    //   body: JSON.stringify(jsonData),
    // })
    //   .then((response) => response.json())
    //   .then((res) => {
    //     //console.log("Success:", res);
    //     if (res.status) {
    //       //sent data to authen services
    //       // sessionStorage.setItem("token", response.data)
    //       // //console.log("sessionStroage was stored")
    //       authenicate(res, () => navigate("/"));

    //       // localStorage.setItem("ut", res.data);
    //     }
    //   })
    //   .catch((error) => {
    //     console.error("Error:", error);
    //   });
  };

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      //console.log("มีข้อมูล");
      //console.log(user);
      setUserNameLocal(user.username);
      setDescriptionLocal(user.description);
      setProfileImageLocal(user.profileImage);
      setCoverImageLocal(user.coverImage);
      setTimeout(() => {
        //console.log(userNameLocal);
        //console.log(descriptionLocal);
        //console.log(profileImageLocal);
        //console.log(coverImageLocal);
      }, 1000);
    }
  }, [coverImage]);
  return (
    <div>
      <div className="relative">
        <div>
          <div className="relative">
            <div>
              <img
                className="shadow-lg rounded-b-2xl m-auto h-[300px]  w-full object-cover"
                src={
                  coverImage64
                    ? coverImage64
                    : `https://pix.adoppix.com/public/${coverImageLocal}`
                }
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
                src={
                  profileImage64
                    ? profileImage64
                    : `https://pix.adoppix.com/public/${profileImageLocal}`
                }
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
              value={userName ? userName : userNameLocal}
              handleChange={(e) => setUserName(e.target.value)}
              handleDoubleClick={() => setShowInputEle(true)}
              handleBlur={() => setShowInputEle(false)}
              showInputEle={showInputEle}
            />
          </div>
          <div>
            <TextAreaMaker 
              value={description ? description : descriptionLocal}
              onClose={handleDescriptionOnClose}
              handleChange={(e) => setDescription(e.target.value)}
              handleDoubleClick={() => setShowInpuDescription(true)}
              handleBlur={() => setShowInpuDescription(false)}
              showInputEle={showInputDescription}
            />
          </div>
        </div>
        <div className="absolute right-0">
          <div>
            <button
              className="w-[120px] h-[40px] m-5 bg-adoppix text-adoplight rounded-lg text-base font-bold"
              onClick={handleSubmit}
            >
              {isSave && <CircularProgress className="text-adoplight" size={20} />}

              {!isSave && <p>บันทึก</p>}
            </button>
          </div>
        </div>
      </div>
      <div>
        <div></div>
        <div>
          <ModalChangeImage
            onClose={handleOnClose}
            visible={profileImageModal}
            profileImageCrop={profileImage}
            setProfileImage={setProfileImage}
            setProfileImage64={setProfileImage64}
          />
          <ModalBannerChange
            onClose={handleBannerOnClose}
            visible={bannerImageModal}
            setCoverImageCrop={setCoverImage}
            setCoverImageCrop64={setCoverImage64}
          />
        </div>
      </div>
    </div>
  );
};

export default Account;
