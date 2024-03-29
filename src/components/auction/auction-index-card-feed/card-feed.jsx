import { useEffect, useState } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";
import Heart from "react-heart";
import { getToken } from "../../../services/authorize";
import {
  auctionLike,
  callAuctionCard,
  callAuctionFilterCard,
} from "../../../services/auctionService";
import { LikeList } from "../like/like";
import MoneyNumber from "../../../services/moneyService";

export const CardFeed = ({
  totalpage,
  settotalpage,
  currentpage,
  handleplus,
  setI,
  istate,
  filterselected,
  value
}) => {
  const [take, setTake] = useState(20);
  const [isloading, setIsloading] = useState(true);
  const [timenow, setTimenow] = useState();
  const [allResult, setAllResult] = useState();
  const [headers, setHeaders] = useState({
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  });

  const [auctionItems, setAuctionItems] = useState([]);

  const setHeaderToken = (token) => {
    setHeaders({
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    });
  };

  const like = async (auctionId, index) => {
    const response = await auctionLike(auctionId);
    //console.log(response);
    const updatedItems = [...auctionItems];
    updatedItems[index] = { ...updatedItems[index], isLike: response };
    setAuctionItems(updatedItems);
    setI(istate + 1);
  };

  function handleContextMenu(event) {
    event.preventDefault();
  }

  // const callData = async () => {
  //   const response = await callAuctionCard(currentpage);
  //   setAuctionItems(response.auctionsList);
  //   settotalpage(response.totalPages);
  //   setTimeout(() => {
  //     setIsloading(false);
  //   }, 1000);
  // };
  const callData = async () => {
    
    const response = await callAuctionFilterCard(filterselected, currentpage ,value);
    setAuctionItems(response.auctionsList);
    console.log(response);
    settotalpage(response.totalPages);
    setAllResult(response.searchResult);
    setTimeout(() => {
      setIsloading(false);
    }, 1000);
  };

  useEffect(() => {
    setTimenow(new Date(Date.now()).toISOString());
    callData();
  }, []);

  useEffect(() => {
    callData();
  }, [filterselected]);
  useEffect(() => {
    callData();
  }, [value]);

  useEffect(() => {
    callData();
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [currentpage]);

  return (
    <div>
      <div className="mb-5">
        ผลการค้นหาทั้งหมด {allResult && allResult} รายการ
      </div>

      <div
        onContextMenu={handleContextMenu}
        className="grid sm:grid-cols-5 grid-cols-2 gap-4"
      >
        {auctionItems.length > 0 &&
          auctionItems.map((auctionItem, index) => (
            <div key={index} className="">
              {!isloading && (
                <div className="relative overflow-hidden">
                  <NavLink
                    className="hover:scale-95 duration-100 hover:brightness-75 transition-all ease-linear"
                    to={`${auctionItem.auctionId}`}
                  >
                    <img
                      onContextMenu={handleContextMenu}
                      className="h-[280px] rounded-lg w-[240px] object-cover overflow-hidden "
                      src={`https://pix.adoppix.com/public/${auctionItem.image}`}
                    />
                  </NavLink>
                  {auctionItem.isLike != null && (
                    <div className="absolute top-0 right-0 p-2">
                      <div style={{ width: "1.5rem" }}>
                        <Heart
                          isActive={auctionItem.isLike}
                          onClick={() => like(auctionItem.auctionId, index)}
                          animationScale={1.25}
                          style={{ marginBottom: "1rem" }}
                        />
                      </div>
                    </div>
                  )}
                  <div className="absolute top-0 left-0 p-2"></div>

                  <div className="absolute bottom-0 h-16 hover:h-36 hover:bg-opacity-90 w-full bg-adopsoftdark bg-opacity-60 duration-300 transition-all ease-in-out p-1">
                    <div className="text-lg flex justify-between items-center">
                      <div className="truncate w-[ุ50%] text-lg">
                        {auctionItem.title}
                      </div>
                      <div className="text-adoppix font-semibold text-lg">
                        {auctionItem.currentAmoutBid > 0
                          ? (
                            <MoneyNumber amount={auctionItem.currentAmoutBid}/>
                          )
                          : "-"}
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="flex">
                        <div>
                          <img
                            onContextMenu={handleContextMenu}
                            className="h-[30px] rounded-full w-[30px] object-cover mx-1"
                            src={`https://pix.adoppix.com/public/${
                              auctionItem.profileImage
                                ? auctionItem.profileImage
                                : "adop.png"
                            }`}
                          />
                        </div>
                        <div className="text-sm font-bold my-auto truncate w-[60%]">
                          {auctionItem.username}
                        </div>
                      </div>
                      <div className="w-[35%]">
                        <div style={{ width: "1.5rem" }}>
                          {auctionItem && (
                            <div>
                              {auctionItem.status !== null ? (
                                <div>
                                  {auctionItem.status === 2 ? (
                                    <div className="bg-red-500 rounded-md w-[60px] h-[22px] text-sm text-center">
                                      สิ้นสุด
                                    </div>
                                  ) : auctionItem.status === 1 ? (
                                    <div className="bg-green-500 rounded-md w-[60px] h-[22px] text-sm text-center">
                                      ประมูลอยู่
                                    </div>
                                  ) : (
                                    <div className="bg-yellow-500 rounded-md w-[60px] h-[22px] text-sm text-center">
                                      ยังไม่เริ่ม
                                    </div>
                                  )}
                                </div>
                              ) : null}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="w-full flex flex-wrap">
                      {auctionItem.tags &&
                        auctionItem.tags.map((tag, index) => (
                          <div
                            key={index}
                            className="py-1 px-1 rounded-lg flex"
                            style={{ flexBasis: "auto" }}
                          >
                            <p className="text-sm cursor-pointer">#{tag}</p>
                          </div>
                        ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}

        {isloading &&
          Array.from({ length: 20 }).map((_, index) => (
            <div key={index} className="animate-pulse">
              <div className="flex items-center justify-center h-[280px] rounded-lg w-[200px] bg-gray-300 dark:bg-adopdark">
                <svg
                  className="w-12 h-12 text-gray-200"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                  fill="currentColor"
                  viewBox="0 0 640 512"
                >
                  <path d="M480 80C480 35.82 515.8 0 560 0C604.2 0 640 35.82 640 80C640 124.2 604.2 160 560 160C515.8 160 480 124.2 480 80zM0 456.1C0 445.6 2.964 435.3 8.551 426.4L225.3 81.01C231.9 70.42 243.5 64 256 64C268.5 64 280.1 70.42 286.8 81.01L412.7 281.7L460.9 202.7C464.1 196.1 472.2 192 480 192C487.8 192 495 196.1 499.1 202.7L631.1 419.1C636.9 428.6 640 439.7 640 450.9C640 484.6 612.6 512 578.9 512H55.91C25.03 512 .0006 486.1 .0006 456.1L0 456.1z" />
                </svg>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};
