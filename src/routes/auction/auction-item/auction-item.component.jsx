import Countdown, { zeroPad } from "react-countdown";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { GiTwoCoins } from "react-icons/gi";
import { AiOutlinePlusCircle } from "react-icons/ai";

import axios from "axios";
import CircularProgress from "@mui/material/CircularProgress";
import React from "react";
import { FaLess } from "react-icons/fa";
import ReactWaterMark from "react-watermark-component";
import { getToken } from "../../../services/authorize";
import { HubConnectionBuilder } from "@microsoft/signalr";
import { AuctionBoard } from "./auctionBoard";
import { getAPIBalance } from "../../../services/userService";
import { callrecommentOnItems } from "../../../services/auctionService";
import { LikeList } from "../../../components/auction/like/like";
import MoneyNumber from "../../../services/moneyService";
import ModalDropDown from "./dropdown/dropdown";
export const AuctionItem = () => {
  const { auctionId } = useParams();
  const navigate = useNavigate();
  const [anotherReccommend, setAnotherReccommend] = useState([]);
  const [auctionData, setAuctionData] = useState();
  const [userData, setUserData] = useState();
  const [money, setMoney] = useState();
  const [isload, setIsload] = useState(false);
  const [dateExpire, setDateExpire] = useState(null);
  const [timeExpire, setTimeExpire] = useState(null);

  const [dropdown, setDropDown] = useState(false);
  const [modalDropDown, setModalDropDown] = useState(false);
  const handleOnClose = () => setModalDropDown(false);

  const text = `${auctionData && auctionData.owner}`;
  const beginAlarm = function () {
    //console.log("start alarm");
  };
  const options = {
    chunkWidth: 200,
    chunkHeight: 60,
    textAlign: "left",
    textBaseline: "bottom",
    globalAlpha: 1,
    font: "14px Microsoft Yahei",
    rotateAngle: -0.26,
    fillStyle: "#1f1f1f",
  };

  const [i, setI] = useState(0);
  const [balance, setBalance] = useState();

  const getBalance = async () => {
    const result = await getAPIBalance();
    setBalance(result);
  };

  const userOrGuest = async () => {
    const token = getToken();
    if (token === false || token === undefined) {
    } else {
      getBalance();
    }
  };

  const ownerData = async (username) => {
    axios
      .get(`https://api.adoppix.com/api/User/${username}/user-info`)
      .then(async (res) => {
        //console.log("Success:", res.data.data);
        setUserData(res.data.data);
        const result = await callrecommentOnItems(res.data.data.username);
        //console.log(result);
        setAnotherReccommend(result);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const getAuction = () => {
    axios
      .get(`https://api.adoppix.com/api/Auction/${auctionId}`)
      .then((res) => {
        console.log(res.data.data)
        if (res.data.data === "removed") {
          navigate(`../../auction/auction404`);
        }
        setAuctionData(res.data.data);
        if (res.data.data.stopTime !== null) {
          const dateTime = res.data.data.stopTime;
          const timeString = dateTime.toLocaleString().replace("T", " ");
          const [date, time] = timeString.split(" ");
          setDateExpire(date);
          setTimeExpire(time);
        }''
       
        ownerData(res.data.data.owner);
        setIsload(true);
        console.log(res.data.data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const getUserMoney = async () => {
    const result = await getAPIBalance();
    setMoney(result);
  };

  const [bidsAuction, setBidsAuction] = useState();

  const multiple = (number) => {
    setBidsAuction(auctionData.currentBid.amount * number);
  };
  const handleBids = (event) => {
    setBidsAuction(event.target.value);
  };

  const bids = async () => {
    const bodyData = {
      amount: 0,
    };
    if (bidsAuction) bodyData.amount = bidsAuction;
    //console.log(bodyData);
    const token = getToken();
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    };

    let result = await axios({
      method: "post",
      url: `https://api.adoppix.com/api/Auction/${auctionId}/bid`,
      data: JSON.stringify(bodyData),
      headers: headers,
    }).catch((err) => console.log(err.response));
    //console.log(result);
    getAuction();
    getUserMoney();
    setBidsAuction("");
    getBalance();
  };

  const [connection, setConnection] = useState(null);

  useEffect(() => {
    const newConnection = new HubConnectionBuilder()
      .withUrl(`https://api.adoppix.com/hub/auction-bid`)
      .withAutomaticReconnect()
      .build();

    setConnection(newConnection);
  }, [auctionId]);

  useEffect(() => {
    if (connection) {
      connection
        .start()
        .then(() => {
          //console.log("hub SignalR Connected!");
        })
        .catch((error) => console.log(`SignalR error: ${error}`));

      connection.on(`${auctionId}`, (message) => {
        //console.log("New message received: ", message);
        getAuction();
        getBalance();
      });
    }
  }, [connection]);

  useEffect(() => {
    userOrGuest();
    setTimeout(() => {
      getAuction();
      getUserMoney();
    }, 1000);
  }, [auctionId]);

  return (
    <div className="bg-adoplight dark:bg-adopdark ">
      {isload && (
        <div>
          <ModalDropDown
            onclose={handleOnClose}
            auctionData={auctionData}
            onclear={() => {
              setSelectedPost(null);
              setModalEdit(false);
            }}
            visible={modalDropDown}
          />

          <div className="sticky top-8 pt-10 z-20">
            <div className="flex mr-10 justify-end items-end space-x-4">
              <LikeList istate={i} />
            </div>
            <div className="text-adoppix duration-300 justify-end mr-10 pt-4 flex items-center ">
              {balance && (
                <div className=" bg-adopsoftdark rounded-lg p-2 flex space-x-2">
                  <MoneyNumber amount={balance} />
                  <GiTwoCoins />
                  <AiOutlinePlusCircle
                    onClick={() => navigate("../topup")}
                    className="  text-white"
                  />
                </div>
              )}
            </div>
          </div>
          <div className=" mx-[400px]">
            <div className="container m-auto min-h-screen">
              <div className="grid grid-cols-12 gap-4">
                <div className=" ml-5 mr-5 col-span-12 space-y-3  ">
                  <div className="flex flex-col sm:flex-row justify-between ">
                    <div className="p-5 bg-adopsoftdark w-full mr-4 rounded-lg">
                      {auctionData && (
                        <div>
                          <ReactWaterMark
                            waterMarkText={text}
                            openSecurityDefense
                            securityAlarm={beginAlarm}
                            options={options}
                          >
                            <div className="relative">
                              <div>
                                {auctionData.images.length > 0 && (
                                  <img
                                    draggable={false}
                                    className="h-[500px] object-cover w-full m-atuo inline-flex rounded-lg shadow-lg blur-sm brightness-75"
                                    src={`https://pix.adoppix.com/public/${
                                      auctionData.images[0]
                                        ? auctionData.images[0]
                                        : "adop.png"
                                    }`}
                                    alt=""
                                  />
                                )}
                              </div>
                              <div className="absolute top-0 m-auto left-0 right-0 ">
                                <p className="text-center">
                                  {auctionData.images.length > 0 && (
                                    <img
                                      draggable={false}
                                      className="h-[500px] object-cover lg:object-contain m-atuo inline-flex rounded-lg shadow-lg"
                                      src={`https://pix.adoppix.com/public/${
                                        auctionData.images[0]
                                          ? auctionData.images[0]
                                          : "adop.png"
                                      }`}
                                      onDragStart={(event) =>
                                        event.preventDefault()
                                      }
                                      alt=""
                                    />
                                  )}
                                </p>
                              </div>
                            </div>
                          </ReactWaterMark>
                        </div>
                      )}
                    </div>
                    <AuctionBoard
                      money={money}
                      auctionData={auctionData}
                      dateExpire={dateExpire}
                      timeExpire={timeExpire}
                      handleBids={handleBids}
                      bids={bids}
                      bidsAuction={bidsAuction}
                      multiple={multiple}
                      auctionId={auctionId}
                    />
                  </div>
                  <div className="flex flex-col sm:flex-row justify-between ">
                    <div className="w-full mr-4">
                      <div className="p-5 bg-adopsoftdark rounded-lg">
                        {auctionData && (
                          <div>
                            <div>
                              <div>{auctionData.title}</div>
                              {userData && (
                                <div
                                  onClick={() =>
                                    navigate(`../../${userData.username}`)
                                  }
                                  className="flex my-5 cursor-pointer"
                                >
                                  <div>
                                    <img
                                      className="h-[40px] w-[40px] rounded-full"
                                      src={`https://pix.adoppix.com/public/${userData.profileImage}`}
                                    />
                                  </div>
                                  <div className="my-auto">
                                    <p className="px-3 text-lg">
                                      {userData.username}
                                    </p>
                                  </div>
                                </div>
                              )}
                              <div className="ml-16 p-2">
                                <span
                                  className=" w-[600px] text-sm whitespace-pre-wrap"
                                  style={{
                                    display: "inline-block",
                                    height: "25px",
                                  }}
                                >
                                  {auctionData.description}
                                </span>

                                <div className="flex">
                                  <div className="w-full flex space-x-1 flex-wrap">
                                    {auctionData.tags.map((tag, index) => (
                                      <div
                                        key={index}
                                        className="py-1 px-1  rounded-lg flex  "
                                      >
                                        <p className="text-sm cursor-pointer">
                                          #{tag}
                                        </p>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                      <div className="p-5 mt-4 bg-adopsoftdark rounded-lg min-h-[300px] ">
                        {auctionData && (
                          <div>
                            <div>
                              <div>ประวัติการประมูล</div>
                              <div className="m-4 max-h-[270px] overflow-y-scroll">
                                {auctionData.bidHistories.length > 0 ? (
                                  auctionData.bidHistories.map((bh, bhi) => (
                                    <div
                                      key={bhi}
                                      className="flex text-lg justify-between hover:brightness-90 duration-300 cursor-pointer px-4 py-2 rounded-lg bg-adoplight dark:bg-adopsoftdark"
                                    >
                                      <div className="mx-3 w-[40%] flex">
                                        <img
                                          className="h-[30px] w-[30px] rounded-full "
                                          src={`https://pix.adoppix.com/public/${bh.profileImage}`}
                                        />
                                        <div className="mx-3 ">
                                          {" "}
                                          {bh.username}
                                        </div>
                                      </div>
                                      <div className="mx-3  w-[40%]">
                                        <MoneyNumber amount={bh.amount} />
                                      </div>
                                      <div className="mx-3  w-[40%]">
                                        {bh.created}
                                      </div>
                                    </div>
                                  ))
                                ) : (
                                  <div className="flex justify-center items-center pt-[70px] h-full text-lg">
                                    ยังไม่มีประวัติการประมูล
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="bg-adopsoftdark h-auto  w-full min-w-[300px]  sm:w-[350px] mt-4 sm:mt-0 rounded-lg p-5">
                      <div className="text-2xl font-bold">เเนะนำเพิ่มเติม</div>
                      <div className="p-3">
                        {anotherReccommend.length > 0 ? (
                          anotherReccommend.map((rec, index) => (
                            <div key={index} className="my-2">
                              <div>
                                <img
                                  draggable={false}
                                  className="h-[140px] object-cover w-full rounded-lg"
                                  src={`https://pix.adoppix.com/public/${rec.image}`}
                                  alt=""
                                />
                              </div>
                              <div className="text-sm font-bold">
                                {rec.title}
                              </div>
                            </div>
                          ))
                        ) : (
                          <div className="flex justify-center items-center mt-[50%]">
                            ไม่พบ
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
