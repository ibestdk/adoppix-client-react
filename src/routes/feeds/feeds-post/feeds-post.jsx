import { BsChatSquare, BsThreeDotsVertical } from "react-icons/bs";
import { useParams } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import React from "react";
import { AiOutlineHeart ,AiFillHeart } from "react-icons/ai";
import { FiAlertTriangle } from "react-icons/fi";
import { getUser } from "../../../services/authorize";
import { getPostUpdate } from "../../../services/apiService";
export const FeedsPost = () => {
  const { postId } = useParams();
  const [post, setPostData] = useState();

  const user = getUser();
  const dropdownRef = useRef(null);
  const [deleteConfirm, setDeleteConfirm] = useState(false);
  const [postEdit, setPostEdit] = useState(false);
  const handlePostEdit = (e) => {
    e.stopPropagation();
    setPostEdit(!postEdit);
  };

  useEffect(() => {
    (async () => {
      const results = await getPostUpdate(postId);
      console.log(results);
      setPostData(results);
    })();
  }, [postId]);

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
    <div className="bg-adoplight dark:bg-adopdark">
      {deleteConfirm && (
        <div className="animation-custom fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center duration-300">
          <div className=" dark:bg-adopsoftdark bg-adoplight w-[350px] p-4 rounded-lg animate-[wiggle_1s_ease-in-out_infinite]">
            <div className="flex flex-col justify-center items-center">
              <FiAlertTriangle className="text-[5rem] text-yellow-300" />
              <div className="mt-4">คุณแน่ใจว่าต้องการลบโพสต์</div>
            </div>
            <div className="flex justify-end items-cente mt-10">
              <div onClick={() => setDeleteConfirm(false)} className="mx-2 rounded-lg px-2 py-1 bg-adopsoftdark cursor-pointer">
                ยกเลิก
              </div>
              <div className="mx-2 rounded-lg px-4 py-1 bg-red-400 text-lg cursor-pointer">
                ยืนยัน
              </div>
            </div>
          </div>
        </div>
      )}

      {post && (
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
                  {post.username}
                </div>
              </div>
              <div>
                {user.username === post.username && (
                  <div>
                    <BsThreeDotsVertical onClick={(e) => handlePostEdit(e)} />
                    {postEdit && (
                      <div className="relative" ref={dropdownRef}>
                        <div className="absolute  right-[-18px] w-[60px] flex flex-col items-center bg-adopdark p-2 rounded-lg  ">
                          <div className="text-sm cursor-pointer hover:bg-adopsoftdark rounded-lg px-2 py-1">
                            แก้ไข
                          </div>
                          <div onClick={() => setDeleteConfirm(true)} className="text-sm cursor-pointer hover:bg-adopsoftdark rounded-lg px-2 py-1">
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
