import axios from "axios";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import React from "react";
import { getToken } from "../../services/authorize";
import CircularProgress from "@mui/material/CircularProgress";

const UserProfileInfomation = ({setHasUser}) => {
  const token = localStorage.getItem("token");
  const { userprofile } = useParams();
  interface ProfileData {
    username: string;
    description: string;
    profileImage: string;
    coverImage: string;
  }
  const [data, setData] = useState<ProfileData>();
  const [followStatus, setFollowStatus] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadFollow, setIsLoadFollow] = useState(false);
  const [yourSelf, setyourSelf] = useState(false);
  const profileData: ProfileData = {
    username: "",
    description: "",
    profileImage: "",
    coverImage: "",
  };

  let userProfile = {};
  const getProfileData = () => {
    axios
      .get(`https://api.adoppix.com/api/User/${userprofile}/user-info`)
      .then((res) => {
        console.log("Success:", res.data);
        if (res.data.status) {
          // console.log(res.data.data);
          setTimeout(() => {
            profileData.username = res.data.data.username;
            profileData.description = res.data.data.description;
            profileData.profileImage = res.data.data.profileImage;
            profileData.coverImage = res.data.data.coverImage;
            setData(res.data.data);
          }, 1000);
          setTimeout(() => {
            console.log("data :");
            console.log(data);
            setIsLoading(false);
          }, 1000);
          setHasUser(true);
          console.log("complete Get User data");
        } else {
          setHasUser(false);
          console.log("fail to get user data");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const handleFollow = () => {
    setIsLoadFollow(true);
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
      "Access-Control-Allow-Origin": "*",
    };
    axios
      .put(`https://api.adoppix.com/api/User/${userprofile}/follow`, null, {
        headers,
      })
      .then((res) => {
        console.log("Follower:", res.data);
        if (res.data.status) {
          setTimeout(() => {
            setFollowStatus(res.data.data);
            setIsLoadFollow(false);
          }, 1000);

          getProfileData();

          console.log("complete Get User data");
        } else {
          console.log("fail to get user data");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        setIsLoadFollow(false);
      });
  };
  const getProfilefollow = () => {
    console.log(token);
    const headers = {
      Authorization: `Bearer ${token}`,
      "Access-Control-Allow-Origin": "*",
    };
    axios
      .get(`https://api.adoppix.com/api/User/${userprofile}/is-following`, {
        headers,
      })
      .then((res) => {
        console.log("Follower:", res.data);
        if (res.data.status) {
          setTimeout(() => {
            setFollowStatus(res.data.data);
          }, 1000);
          console.log("complete Get User data");
        } else {
          console.log("fail to get user data");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    if (user.username === userprofile) {
      setyourSelf(true);
    }

    console.log(userprofile);
    setTimeout(() => {
      getProfileData();
      getProfilefollow();
    }, 1000);
  }, []);
  return (
    <div>
      <div>
        <div className="relative">
          <div className="">
            <div className="relative">
              <div>
                {isLoading && (
                  <div className="h-[300px]  space-y-8 animate-pulse md:space-y-0 md:space-x-8 rounded-b-xl md:flex md:items-center bg-gray-300 dark:bg-gray-700">
                    <div className="mx-auto flex justify-center items-center w-full h-[350px]  rounded  sm:w-96">
                      <svg
                        className="mx-auto w-12 h-12 text-gray-200"
                        xmlns="http://www.w3.org/2000/svg"
                        aria-hidden="true"
                        fill="currentColor"
                        viewBox="0 0 640 512"
                      >
                        <path d="M480 80C480 35.82 515.8 0 560 0C604.2 0 640 35.82 640 80C640 124.2 604.2 160 560 160C515.8 160 480 124.2 480 80zM0 456.1C0 445.6 2.964 435.3 8.551 426.4L225.3 81.01C231.9 70.42 243.5 64 256 64C268.5 64 280.1 70.42 286.8 81.01L412.7 281.7L460.9 202.7C464.1 196.1 472.2 192 480 192C487.8 192 495 196.1 499.1 202.7L631.1 419.1C636.9 428.6 640 439.7 640 450.9C640 484.6 612.6 512 578.9 512H55.91C25.03 512 .0006 486.1 .0006 456.1L0 456.1z" />
                      </svg>
                    </div>
                  </div>
                )}
                {!isLoading && (
                  <img
                    className="shadow-lg rounded-b-2xl m-auto h-[300px]  w-full object-cover"
                    src={
                      data?.coverImage
                        ? `https://pix.adoppix.com/public/${data?.coverImage}`
                        : "https://pix.adoppix.com/public/6d3ed0c6-f9f7-41f8-8142-2e8c0d71a3a5.jpg"
                    }
                  ></img>
                )}
              </div>
            </div>
          </div>
          <div className="grid grid-cols-12 gap-4">
            <div className="col-span-4">
              {isLoading && (
                <svg
                  className="m-auto w-[200px] h-[200px] bg-adoplight dark:bg-adopdark dark:border-adopdark border-adoplight  rounded-full  text-gray-200 dark:text-gray-700 absolute top-52 left-24 border-[20px]"
                  aria-hidden="true"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                  className="animate-pulse"
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z"
                  ></path>
                </svg>
              )}
              {!isLoading && (
                <div className="absolute top-52 left-24 border-[20px] rounded-full dark:border-adopdark border-adoplight shadow-lg">
                  <div className="relative">
                    <div>
                      <img
                        className="shadow-lg m-auto h-[180px]  w-[180px] rounded-full object-cover "
                        src={`https://pix.adoppix.com/public/${data?.profileImage}`}
                      ></img>
                    </div>
                    <div className="absolute top-0 left-0 text-4xl w-[180px] h-[180px]"></div>
                  </div>
                </div>
              )}
            </div>
            <div className="col-span-5">
              <div className=" left-[30%] mt-3">
                <div className="mb-2">
                  {isLoading && (
                    <div>
                      <div className="h-6 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4 animate-pulse"></div>
                    </div>
                  )}
                  {!isLoading && <div>{data?.username}</div>}
                </div>
                <div>
                  {isLoading && (
                    <div>
                      <div className="h-4 bg-gray-200 rounded-[60px] dark:bg-gray-700 w-48 mb-4 animate-pulse"></div>
                    </div>
                  )}
                  {!isLoading && (
                    <div>
                      <div className="text-base">{data?.followerCount} คนกำลังติดตาม</div>
                    </div>
                  )}
                </div>
                <span
                  className=" w-[600px] text-sm whitespace-pre-wrap"
                  style={{
                    display: "inline-block",
                    height: "25px",
                  }}
                >
                  {data?.description}
                </span>
              </div>
            </div>
            <div className="col-span-3">
              <div className="relative">
                {!yourSelf && (
                  <div className="right-0 top-0 absolute">
                    {isLoading && (
                      <div className="w-[120px] m-3  h-[40px] bg-gray-200 rounded-lg  dark:bg-gray-700  animate-pulse"></div>
                    )}
                    {!isLoading && (
                      <div className="shadow-sm p-3">
                        {followStatus && (
                          <div className="bg-white text-adopsoftdark   rounded-lg text-sm w-[120px] h-[40px]">
                            <button
                              onClick={handleFollow}
                              className="w-full h-full"
                            >
                              {isLoadFollow && (
                                <div>
                                  <CircularProgress className="" size={20} />
                                </div>
                              )}
                              {!isLoadFollow && (
                                <div>
                                  <p className="mx-auto px-auto text-center font-bold">
                                    กำลังติดตาม
                                  </p>
                                </div>
                              )}
                            </button>
                          </div>
                        )}
                        {!followStatus && (
                          <div className="bg-adoppix text-adoplight  rounded-lg text-sm w-[120px] h-[40px]">
                            <button
                              onClick={handleFollow}
                              className="w-full h-full"
                            >
                              {isLoadFollow && (
                                <div>
                                  <CircularProgress
                                    className="text-white"
                                    size={20}
                                  />
                                </div>
                              )}
                              {!isLoadFollow && (
                                <div>
                                  <p className="font-bold">ติดตาม</p>
                                </div>
                              )}
                            </button>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="shadow-xl py-5 mx-auto">
            <div className="flex w-[400px] m-auto">
              <div className="m-auto text-adoppix">หน้าหลัก</div>
              <div className="m-auto">feeds</div>
              <div className="m-auto">auction</div>
            </div>
          </div>
          <div className="absolute right-0"></div>
        </div>
      </div>
    </div>
  );
};

export default UserProfileInfomation;
