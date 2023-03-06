import { BsFillImageFill, BsChatSquare } from "react-icons/bs";
import { AiOutlineHeart } from "react-icons/ai";
import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import ModalCreatePost from "../../../components/feeds/modal/create/modalCreate";
import { NavLink } from "react-router-dom";
import ModalPost from "../../../components/feeds/modal/post/modalPost";
import { getToken } from "../../../services/authorize";
export const FeedsIndex = () => {
  const [profileImageModal, setProfileImageModal] = useState(false);
  const handleOnClose = () => setProfileImageModal(false);
  const [postModal, setPostModal] = useState(false);
  const handleOnClosePost = () => setPostModal(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const [feeds, setFeeds] = useState([]);

  const getFeeds = async () => {
    const token = getToken();
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
      "Access-Control-Allow-Origin": "*",
    };

    let response = await axios({
      method: "get",
      url: `https://api.adoppix.com/api/Post?take=10&page=0`,
      headers: headers,
    }).catch((err) => console.log(err.response));
    console.log(response.data.data);
    setFeeds(response.data.data);
  };
  useEffect(() => {
    setTimeout(() => {
      getFeeds();
    }, 1000);
  }, []);

  return (
    <div>
      <div>
        <ModalCreatePost onClose={handleOnClose} visible={profileImageModal} />
      </div>
      <div
        className="p-5 dark:bg-adopsoftdark m-4 rounded-lg"
        onClick={() => setProfileImageModal(true)}
      >
        <div>
          <div className="flex">
            <div className="relative">
              <img
                className="rounded-full w-[40px] h-[40px] "
                src="https://pix.adoppix.com/public/43212205-5814-4274-a04d-748a13a15a7c.jpg"
              />
            </div>
            <div className=" rounded-2xl bg-adopdark w-[80%] mx-4"></div>
            <div className="m-auto ">
              <BsFillImageFill />
            </div>
          </div>
        </div>
      </div>

      {feeds.length > 0 ? (
        feeds.map((post, postIndex) => (
          <div key={postIndex}>
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
                <NavLink
                  className="hover:scale-95 duration-100 hover:brightness-75 transition-all ease-linear"
                  to={`${post.postId}`}
                >
                  <img
                    className="rounded-lg w-full "
                    src={`https://pix.adoppix.com/public/${post.images[0]}`}
                  />
                </NavLink>
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
          </div>
        ))
      ) : (
        <p className="text-center">No posts found.</p>
      )}
      {selectedPost && (
        <ModalPost
          onClose={() => setSelectedPost(null)}
          visible={true}
          postData={selectedPost}
        />
      )}
    </div>
  );
};
