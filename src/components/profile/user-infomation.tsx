import axios from "axios";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import React from "react";
import { getToken } from "../../services/authorize";
import CircularProgress from "@mui/material/CircularProgress";
import { getProfileAuction, getProfilePost } from "../../services/apiService";

const UserProfileInfomation = ({
  setHasUser,
  setProfilePage,
  profilePage,
  setUserPost,
  setUserAuction,
  setUserAll
}) => {
  const token = localStorage.getItem("token");
  const { userprofile } = useParams();
  interface ProfileData {
    username: string;
    description: string;
    profileImage: string;
    coverImage: string;
    followerCount: number;
  }
  let activeClassName = "text-adoppix";
  let unActiveClassName = "text-adoplighticon";
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
    followerCount: 0,
  };

  const handleChangeProfilePage = (page) => {
    setProfilePage(page);
  };

  let userProfile = {};
  const getProfileData = () => {
    axios
      .get(`https://api.adoppix.com/api/User/${userprofile}/user-info`)
      .then((res) => {
        //console.log("Success:", res.data);
        if (res.data.status) {
          // //console.log(res.data.data);
          setTimeout(() => {
            profileData.username = res.data.data.username;
            profileData.description = res.data.data.description;
            profileData.profileImage = res.data.data.profileImage;
            profileData.coverImage = res.data.data.coverImage;
            setData(res.data.data);
          }, 1000);
          setTimeout(() => {
            //console.log("data :");
            //console.log(data);
            setIsLoading(false);
          }, 1000);
          setHasUser(true);
          //console.log("complete Get User data");
        } else {
          setHasUser(false);
          //console.log("fail to get user data");
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
        //console.log("Follower:", res.data);
        if (res.data.status) {
          setTimeout(() => {
            setFollowStatus(res.data.data);
            setIsLoadFollow(false);
          }, 1000);

          getProfileData();

          //console.log("complete Get User data");
        } else {
          //console.log("fail to get user data");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        setIsLoadFollow(false);
      });
  };
  const getProfilefollow = () => {
    //console.log(token);
    const headers = {
      Authorization: `Bearer ${token}`,
      "Access-Control-Allow-Origin": "*",
    };
    axios
      .get(`https://api.adoppix.com/api/User/${userprofile}/is-following`, {
        headers,
      })
      .then((res) => {
        //console.log("Follower:", res.data);
        if (res.data.status) {
          setTimeout(() => {
            setFollowStatus(res.data.data);
          }, 1000);
          //console.log("complete Get User data");
        } else {
          //console.log("fail to get user data");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
  useEffect(() => {
    setyourSelf(false);
    setIsLoading(true);

    const user = JSON.parse(localStorage.getItem("user") || "{}");
    if (user.username === userprofile) {
      setyourSelf(true);
    }

    //console.log(userprofile);
    setTimeout(() => {
      getProfileData();

      getProfilefollow();
    }, 1000);
  }, [userprofile]);

  useEffect(() => {
    (async () => {
      const results = await getProfilePost(userprofile);
      //console.log("profilePost ======================");
      //console.log(results);
      setUserPost(results);
    })();
  }, [userprofile]);

  useEffect(() => {
    (async () => {
      const results = await getProfileAuction(userprofile);
      //console.log("profileAuction ======================");
      //console.log(results);
      setUserAuction(results);
    })();
  }, [userprofile]);

  useEffect(() => {
    (async () => {
      const resultsAuction = await getProfileAuction(userprofile);
      // console.log(resultsAuction);
      const resultsPost = await getProfilePost(userprofile);
      // console.log(resultsPost);
      const results = resultsAuction.concat(resultsPost);
      // console.log(results);
      //console.log("profileAuction ======================");

      //console.log(results);
      setUserAll(results);
    })();
  }, [userprofile]);

  return (
    <div>
      <div>
        <div className="relative">
          <div className="">
            <div className="relative">
              <div>
                {isLoading && (
                  <div className="sm:h-[300px] h-[180px] space-y-8 animate-pulse md:space-y-0 md:space-x-8 rounded-b-xl md:flex md:items-center bg-gray-300 dark:bg-gray-700">
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
                    className="shadow-lg rounded-b-2xl m-auto sm:h-[300px] h-[180px]  w-full object-cover"
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
          <div className="sm:grid sm:grid-cols-12 sm:gap-4 flex flex-row">
            <div className="sm:col-span-4">
              {isLoading && (
                <svg
                  className="m-auto sm:h-[180px]  sm:w-[180px] h-[80px] w-[80px] bg-adoplight dark:bg-adopdark dark:border-adopdark border-adoplight  rounded-full  text-gray-200 dark:text-gray-700 absolute sm:top-52 sm:left-24 top-28 left-5 border-[20px]"
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
                <div className="absolute sm:top-52 sm:left-24 top-28 left-5 border-[20px] rounded-full dark:border-adopdark border-adoplight shadow-lg">
                  <div className="relative">
                    <div>
                      <img
                        className="shadow-lg m-auto sm:h-[180px]  sm:w-[180px] h-[80px] w-[80px] rounded-full object-cover bg-white dark:bg-adopsoftdark "
                        src={
                          data?.profileImage
                            ? `https://pix.adoppix.com/public/${data?.profileImage}`
                            : "https://pix.adoppix.com/image/adop.png"
                        }
                      ></img>
                    </div>
                    <div className="absolute top-0 left-0 text-4xl w-[180px] h-[180px]"></div>
                  </div>
                </div>
              )}
            </div>
            <div className="sm:col-span-8">
              <div className="flex justify-between">
                <div className=" relative">
                  <div className=" sm:left-[30%] sm:ml-0 ml-36 mt-3">
                    <div className="mb-2">
                      {isLoading && (
                        <div>
                          <div className="h-6 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4 animate-pulse"></div>
                        </div>
                      )}
                      {!isLoading && (
                        <div className="sm:text-lg text-sm">
                          {data?.username}
                        </div>
                      )}
                    </div>
                    <div>
                      {isLoading && (
                        <div>
                          <div className="h-4 bg-gray-200 rounded-[60px] dark:bg-gray-700 w-48 mb-4 animate-pulse"></div>
                        </div>
                      )}
                      {!isLoading && (
                        <div>
                          <div className="sm:text-base text-xs">
                            {data?.followerCount} คนกำลังติดตาม
                          </div>
                        </div>
                      )}
                    </div>
                    {data?.description && (
                      <span
                        className="sm:w-[600px] text-sm whitespace-pre-wrap"
                        style={{
                          display: "inline-block",
                          height: "25px",
                        }}
                        dangerouslySetInnerHTML={{
                          __html: addLinkToDescription(data?.description),
                        }}
                      ></span>
                    )}
                  </div>
                </div>
                <div className="  ">
                  <div className="flex right-0">
                    {!yourSelf && (
                      <div className="">
                        {isLoading && (
                          <div className="sm:w-[120px] m-3  sm:h-[40px] bg-gray-200 rounded-lg  dark:bg-gray-700  animate-pulse"></div>
                        )}
                        {!isLoading && (
                          <div className="shadow-sm p-3">
                            {followStatus && (
                              <div className="bg-white text-adopsoftdark   rounded-lg text-sm sm:w-[120px] sm:h-[40px] px-2 py-1">
                                <button
                                  onClick={handleFollow}
                                  className="w-full h-full"
                                >
                                  {isLoadFollow && (
                                    <div>
                                      <CircularProgress
                                        className=""
                                        size={20}
                                      />
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
                              <div className="bg-adoppix text-adoplight  rounded-lg text-sm sm:w-[120px] sm:h-[40px] px-2 py-1">
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
            </div>
          </div>
          <div className="shadow-xl py-5 mx-auto">
            <div className="flex w-[400px] m-auto">
              <div
                onClick={() => handleChangeProfilePage(1)}
                className={`duration-200 m-auto cursor-pointer ${
                  profilePage === 1 ? "text-adoppix" : "text-adoplighticon"
                }`}
              >
                หน้าหลัก
              </div>
              <div
                onClick={() => handleChangeProfilePage(2)}
                className={`duration-200 m-auto cursor-pointer ${
                  profilePage === 2 ? "text-adoppix" : "text-adoplighticon"
                }`}
              >
                ฟีต
              </div>
              <div
                onClick={() => handleChangeProfilePage(3)}
                className={`duration-200 m-auto cursor-pointer ${
                  profilePage === 3 ? "text-adoppix" : "text-adoplighticon"
                }`}
              >
                การประมูล
              </div>
            </div>
          </div>
          <div className="absolute right-0"></div>
        </div>
      </div>
    </div>
  );
};

export default UserProfileInfomation;
function addLinkToDescription(description) {
  // Use a regular expression to find URLs in the description
  const urlRegex = /(https?:\/\/[^\s]+)/g;

  // Replace the URLs with <a> tags
  const descriptionWithLink = description.replace(urlRegex, (url) => {
    return `<a href="${url}" className="text-red-500" target="_blank" rel="noopener noreferrer">${url}</a>`;
  });

  return descriptionWithLink;
}
