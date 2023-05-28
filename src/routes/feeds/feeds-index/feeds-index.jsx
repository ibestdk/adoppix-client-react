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
import React, { useState, useRef, useEffect, useCallback } from "react";
import ModalCreatePost from "../../../components/feeds/modal/create/modalCreate";
import { NavLink, useNavigate } from "react-router-dom";
import ModalPost from "../../../components/feeds/modal/post/modalPost";
import { getPostUpdate, postLike } from "../../../services/apiService";
import { getUser } from "../../../services/authorize";
import ImagePreview from "../../../components/feeds/modal/imagePreview/imagePreview";
import ModalEditPost from "../../../components/feeds/modal/Edit/edit";
import ModalPostDelete from "../../../components/feeds/modal/Delete/delete";
import { getFeeds } from "../../../services/feedsService";
import ModalReport from "../../../components/feeds/modal/Report/report";

export const FeedsIndex = () => {
  const navigate = useNavigate();
  const [feeds, setFeeds] = useState({
    postList: [],
    totalPages: 0,
    currentPage: 0,
    searchResult: 0,
  });
  const [page, setPage] = useState(0);
  // const [totalPage, setTotalPage] = useState(0);
  // const [searchResult, setSearchResult] = useState();
  const [endFeeds, setEndFeeds] = useState(false);

  const [profileImageModal, setProfileImageModal] = useState(false);
  const [postModal, setPostModal] = useState(false);
  const [postEdit, setPostEdit] = useState(false);
  const [modalComment, setModalComment] = useState(false);
  const [modalEdit, setModalEdit] = useState(false);
  const [modalDelete, setModalDelete] = useState(false);
  const [modalReport, setModalReport] = useState(false);
  const [selectedCardId, setSelectedCardId] = useState(null);
  const dropdownRef = useRef(null);
  const [selectedPost, setSelectedPost] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

  // const handleOnClosePost = () => setPostModal(false);
  const handleOnClose = () => setProfileImageModal(false);
  const handleOnCloseEdit = () => setModalEdit(false);
  const handleOnCloseReport = () => setModalReport(false);
  const handlePostEdit = (cardId) => {
    setSelectedCardId(cardId);
    setPostEdit(!postEdit);
  };

  const likePost = async (postId, index) => {
    //console.log("like");

    postLike(postId);
    await setTimeout(1000);
    (async () => {
      const updatedPost = await getPostUpdate(postId);
      //console.log(updatedPost);
      setFeeds((feeds) => {
        const newPostList = [...feeds.postList]; // spread the postList array instead
        newPostList[index] = updatedPost;
        return { ...feeds, postList: newPostList }; // update the postList property in the feeds object
      });
    })();
  };

  const reloadFeeds = async () => {
    const results = await getFeeds(page);
    //console.log(results);
    setFeeds(results);
  };

  const callFeeds = async () => {
    const result = await getFeeds(page);
    await setFeeds(result);
  };

  const user = getUser();

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop ===
      document.documentElement.offsetHeight
    ) {
      //console.log(feeds);
      loadMoreItems();
    }
  };

  const loadMoreItems = async () => {
    //console.log(feeds);
    //console.log(feeds.totalPages);
    const nextPage = page + 1;
    //console.log("next page : ", nextPage);
    //console.log("total Page : ", feeds.totalPages);
    if (nextPage >= feeds.totalPages) {
      setEndFeeds(true);
      //console.log("nextPage >= totalPage");
      //console.log(nextPage > feeds.totalPages - 1);
      //console.log("Stopped");
      return null;
    } else if (nextPage < feeds.totalPages) {
      //console.log("nextPage < totalPage");
      //console.log(nextPage < feeds.totalPages - 1);

      //console.log("Played");
      try {
        const results = await getFeeds(nextPage);
        const updatedItems = [...feeds.postList, ...results.postList];
        setFeeds({ ...feeds, postList: updatedItems });
        setPage(nextPage);
      } catch (error) {
        console.error(error);
      }
    }
  };

  useEffect(() => {
    callFeeds();
  }, []);

  const handleRoute = useCallback(
    (username) => {
      navigate("/" + username);
    },
    [navigate]
  );
  // useEffect(() => {
  //   callFeeds();
  //   //console.log(totalPage);
  // }, [totalPage]);

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

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [feeds]);

  return (
    <div className="w-[600px] mx-auto">
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
            onclear={() => {
              setSelectedPost(null);
              setModalEdit(false);
            }}
            visible={modalEdit}
            reloadFeeds={reloadFeeds}
          />
        )}
        {selectedPost && (
          <ModalReport
            onclose={handleOnCloseReport}
            postdata={selectedPost}
            onclear={() => {
              setSelectedPost(null);
              setModalEdit(false);
            }}
            visible={modalReport}
            reloadFeeds={reloadFeeds}
          />
        )}
        {selectedPost && (
          <ModalPostDelete
            onclose={handleOnCloseEdit}
            postdata={selectedPost}
            onclear={() => {
              setSelectedPost(null);
              setModalDelete(false);
            }}
            visible={modalDelete}
            reloadFeeds={reloadFeeds}
          />
        )}
      </div>

      <div
        className="p-5 dark:bg-adopsoftdark m-4 rounded-lg "
        onClick={() => setProfileImageModal(true)}
      >
        <div>
          <div className="flex">
            <div className="">
              <img
                className="rounded-full w-[50px] h-[50px] border-2 p-1 z-0 bg-adoplight dark:bg-adopsoftdark border-adoppix outline-adoppix"
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
      {feeds.postList.length > 0 ? (
        feeds.postList.map((post, postIndex) => (
          <div key={postIndex}>
            <div className="p-5 m-4  rounded-lg  bg-adopsoftdark ">
              <div>
                <div className="flex justify-between items-center">
                  <div className="flex">
                    <div
                      onClick={() => handleRoute(post.username)}
                      className="cursor-pointer"
                    >
                      <img
                        className="rounded-full w-[40px] h-[40px]  "
                        src={`https://pix.adoppix.com/public/${
                          post.profileImage ? post.profileImage : "brushsan.png"
                        }`}
                      />
                    </div>
                    <div className="text-lg font-bold inline-block align-middle my-auto mx-2">
                      <div className="flex items-center">
                        <div
                          className="cursor-pointer"
                          onClick={() => handleRoute(post.username)}
                        >
                          {" "}
                          {post.username}
                        </div>
                        <div className="text-sm mx-3 font-light flex items-center">
                          <AiFillClockCircle className="mx-2" />
                          <div>{post.relativeTime}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-end items-center">
                    {user.username === post.username ? (
                      <div>
                        <BsThreeDotsVertical
                          onClick={() => handlePostEdit(post.postId)}
                        />
                        {postEdit && selectedCardId === post.postId && (
                          <div className="relative" ref={dropdownRef}>
                            <div className="absolute  right-[-18px] w-[60px] flex flex-col items-center bg-adopdark p-2 rounded-lg  ">
                              <div
                                onClick={() => {
                                  setSelectedPost(post);
                                  setModalEdit(true);
                                  setPostEdit(false);
                                }}
                                className="text-sm cursor-pointer hover:bg-adopsoftdark rounded-lg px-2 py-1"
                              >
                                แก้ไข
                              </div>
                              <div
                                onClick={() => {
                                  setSelectedPost(post);
                                  setModalDelete(true);
                                  setPostEdit(false);
                                }}
                                className="text-sm cursor-pointer hover:bg-adopsoftdark rounded-lg px-2 py-1"
                              >
                                ลบ
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    ) : (
                      <div>
                       <BsThreeDotsVertical
                          onClick={() => handlePostEdit(post.postId)}
                        />
                        {postEdit && selectedCardId === post.postId && (
                          <div className="relative" ref={dropdownRef}>
                            <div className="absolute  right-[-18px] w-[60px] flex flex-col items-center bg-adopdark p-2 rounded-lg  ">
                              <div
                                onClick={() => {
                                  setSelectedPost(post);
                                  setModalReport(true);
                                  setPostEdit(false);
                                }}
                                className="text-sm cursor-pointer hover:bg-adopsoftdark rounded-lg px-2 py-1"
                              >
                                รายงาน
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
                <div>
                  <div className="text-lg px-2 py-3 break-words max-w-[550px]">
                    {post.description}
                  </div>
                  <div className="my-2">
                    {post.tags.length > 0 && (
                      <div className="flex flex-wrap ">
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
                    <div
                      onClick={() => {
                        {
                          setSelectedPost(post);
                          setModalComment(true);
                        }
                      }}
                    >
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
      {endFeeds && (
        <div className="flex flex-col justify-center items-center mt-10 mb-10">
          <div className="text-2xl font-bold">ฟีตของคุณสิ้นสุดลงเเล้ว</div>
          <div className="text-xs">
            Tip : กดติดตามศิลปินเพิ่มเพื่อให้ฟีตของคุณมีจำนวนเยอะขึ้น
          </div>
        </div>
      )}
      {selectedPost && (
        <ModalPost
          onClose={() => {
            setSelectedPost(null);
            setModalComment(false);
          }}
          visible={modalComment}
          postData={selectedPost}
        />
      )}
      {selectedImage && (
        <ImagePreview
          onClose={() => {
            setSelectedImage(null);
          }}
          visible={true}
          postData={selectedImage}
        />
      )}
    </div>
  );
};
