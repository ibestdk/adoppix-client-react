import {
  BsFillImageFill,
  BsChatSquare,
  BsThreeDotsVertical,
} from "react-icons/bs";
import {
  AiOutlineHeart,
  AiFillHeart,
  AiFillClockCircle,
  AiOutlineShareAlt,
} from "react-icons/ai";
import { BsFilePost } from "react-icons/bs";
import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import ModalCreatePost from "../../../components/feeds/modal/create/modalCreate";
import { NavLink } from "react-router-dom";
import ModalPost from "../../../components/feeds/modal/post/modalPost";
import { getToken } from "../../../services/authorize";
import {
  getFeeds,
  getPostUpdate,
  postLike,
} from "../../../services/apiService";
import { getUser } from "../../../services/authorize";
import ImagePreview from "../../../components/feeds/modal/imagePreview/imagePreview";
import ModalEditPost from "../../../components/feeds/modal/Edit/edit";
export const FeedsIndex = () => {
  const [profileImageModal, setProfileImageModal] = useState(false);
  const [postModal, setPostModal] = useState(false);
  const [postEdit, setPostEdit] = useState(false);
  const [modalComment, setModalComment] = useState(false);
  const [modalEdit, setModalEdit] = useState(false);
  const [selectedCardId, setSelectedCardId] = useState(null);
  const dropdownRef = useRef(null);
  const [selectedPost, setSelectedPost] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [feeds, setFeeds] = useState([]);

  const handleOnClosePost = () => setPostModal(false);
  const handleOnClose = () => setProfileImageModal(false);
  const handleOnCloseEdit = () => setModalEdit(false);
  const handlePostEdit = (cardId) => {
    setSelectedCardId(cardId);
    setPostEdit(!postEdit);
  };

  const likePost = async (postId, index) => {
    console.log("like");

    postLike(postId);
    await setTimeout(1000);
    (async () => {
      const updatedPost = await getPostUpdate(postId);
      console.log(updatedPost);
      setFeeds((feeds) => {
        const newFeeds = [...feeds];
        newFeeds[index] = updatedPost;
        return newFeeds;
      });
    })();
  };

  const reloadFeeds = async () => {
    const results = await getFeeds();
    console.log(results);
    setFeeds(results);
  };
  const user = getUser();
  // console.log("user", user)
  useEffect(() => {
    (async () => {
      const results = await getFeeds();
      // console.log(results);
      setFeeds(results);
    })();
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setPostEdit(false);
      }
    };

    document.addEventListener("click", handleClickOutside, true);

    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, [dropdownRef]);

  return (
    <div className="">
      <div>
        <ModalCreatePost
          onClose={handleOnClose}
          visible={profileImageModal}
          reloadFeeds={reloadFeeds}
        />
        {selectedPost && (
          <ModalEditPost
          onclose={handleOnCloseEdit}
          postdata={selectedPost}
          onclear={() => {setSelectedPost(null); setModalEdit(false);}}
          visible={modalEdit}
          reloadFeeds={reloadFeeds}/>
        )}
      </div>
      <div
        className="p-5 dark:bg-adopsoftdark m-4 rounded-lg"
        onClick={() => setProfileImageModal(true)}
      >
        <div>
          <div className="flex">
            <div className="relative">
              <img
              className="rounded-full w-[50px] h-[50px] border-2 p-1 bg-adoplight dark:bg-adopsoftdark border-adoppix outline-adoppix"
              src={`https://pix.adoppix.com/public/${
                user.profileImage ? user.profileImage : "brushsan.png"
              }`}
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
                <div className="flex justify-between items-center">
                  <div className="flex">
                    <div>
                      <img
                        className="rounded-full w-[40px] h-[40px] "
                        src={`https://pix.adoppix.com/public/${post.profileImage}`}
                      />
                    </div>
                    <div className="text-lg font-bold inline-block align-middle my-auto mx-2">
                      <div className="flex items-center">
                        <div> {post.username}</div>
                        <div className="text-sm mx-3 font-light flex items-center">
                          <AiFillClockCircle className="mx-2" />
                          <div>{post.relativeTime}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-end items-center">
                    {user.username === post.username && (
                      <div>
                        <BsThreeDotsVertical
                          onClick={() => handlePostEdit(post.postId)}
                        />
                        {postEdit && selectedCardId === post.postId && (
                          <div className="relative" ref={dropdownRef}>
                            <div className="absolute  right-[-18px] w-[60px] flex flex-col items-center bg-adopdark p-2 rounded-lg  ">
                              <div onClick={() => {setSelectedPost(post); setModalEdit(true); setPostEdit(false)}} className="text-sm cursor-pointer hover:bg-adopsoftdark rounded-lg px-2 py-1">
                                แก้ไข
                              </div>
                              <div className="text-sm cursor-pointer hover:bg-adopsoftdark rounded-lg px-2 py-1">
                                ลบ
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
                <div>
                  <div className="text-lg px-2 py-3">{post.description}</div>
                  <div className="my-2">
                    {post.tags.length > 0 && (
                      <div className="grid grid-cols-4 ">
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
                <div
                  onClick={() => {
                    setSelectedImage(post);
                   
                  }}
                  className="hover:opacity-80 duration-500 hover:brightness-75 transition-all ease-linear"
                >
                  <img
                    className="rounded-lg w-full "
                    src={`https://pix.adoppix.com/public/${post.images[0]}`}
                  />
                </div>
              </div>
              <div className="mt-2 flex items-center justify-between">
                <div className="flex">
                  <div className="flex items-center">
                    {post.isLike ? (
                      <AiFillHeart
                        onClick={() => likePost(post.postId, postIndex)}
                        className="text-red-500"
                      />
                    ) : (
                      <AiOutlineHeart
                        onClick={() => likePost(post.postId, postIndex)}
                      />
                    )}
                    <div className="text-lg">
                      {post.likeCount > 0 ? post.likeCount : ""}
                    </div>
                  </div>
                  <div className="mx-4 text-xl pt-1">
                    <div onClick={() => {{setSelectedPost(post); setModalComment(true);}}}>
                      <BsChatSquare />
                    </div>
                  </div>
                  <div className="mx-4 text-xl pt-1">
                    <div>
                      <AiOutlineShareAlt />
                    </div>
                  </div>
                </div>
                <div className="mx-4 text-xl pt-1 hover:opacity-75 duration-300">
                  <NavLink className="flex items-center" to={post.postId}>
                    <BsFilePost />
                    <div className="text-xs ">ไปยังโพสต์</div>
                  </NavLink>
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
          onClose={() => {setSelectedPost(null);  setModalComment(false);}}
          visible={modalComment}
          postData={selectedPost}
        />
      )}
      {selectedImage && (
        <ImagePreview
          onClose={() => {
            setSelectedImage(null);
           
          } }
          visible={true}
          postData={selectedImage}
        />
      )}
    </div>
  );
};
