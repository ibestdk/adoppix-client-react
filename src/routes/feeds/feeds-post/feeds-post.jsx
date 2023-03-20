import Countdown, { zeroPad } from "react-countdown";
import { BsFillImageFill, BsChatSquare } from "react-icons/bs";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import CircularProgress from "@mui/material/CircularProgress";
import React from "react";
import { FaLess } from "react-icons/fa";
import { AiOutlineHeart } from "react-icons/ai";
import ReactWaterMark from "react-watermark-component";
import { getToken } from "../../../services/authorize";
export const FeedsPost = () => {
  const { postId } = useParams();
  const [post, setPostData] = useState();

  const getPost = async () => {
    const token = getToken();
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
      "Access-Control-Allow-Origin": "*",
    };

    let response = await axios({
      method: "get",
      url: `https://api.adoppix.com/api/Post/${postId}`,
      headers: headers,
    }).catch((err) => console.log(err.response));
    console.log(response.data.data);
    setPostData(response.data.data);
  };

  useEffect(() => {
    setTimeout(() => {
      getPost();
    }, 1000);
  }, []);

  return (
    <div className="bg-adoplight dark:bg-adopdark">
      {post && (
        <div className="p-5 m-4  rounded-lg  bg-adopsoftdark">
          <div>
            <div className="flex">
              <div>
                <img
                  className="rounded-full w-[40px] h-[40px] "
                  src={`https://pix.adoppix.com/public/${post.profileImage}`}
                />
              </div>
              <div className="text-lg font-bold inline-block align-middle my-auto mx-2">
                {post.username}
              </div>
            </div>
            <div>
              <div className="text-lg px-2 py-3">{post.description}</div>
              <div className="my-2">
                {post.tags.length > 0 && (
                  <div className="flex">
                    {post.tags.map((tag, tagindex) => (
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
              src={`https://pix.adoppix.com/public/${post.images[0]}`}
            />
          </div>
          <div className="mt-2 flex">
            <div>
              <AiOutlineHeart />
            </div>
            <div className="mx-4 text-xl pt-1">
              <div onClick={() => setSelectedPost(post)}>
                <BsChatSquare />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
