import Countdown, { zeroPad } from "react-countdown";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import CircularProgress from "@mui/material/CircularProgress";
import React from "react";
import { FaLess } from "react-icons/fa";
import ReactWaterMark from 'react-watermark-component';
import { getToken } from "../../../services/authorize";
export const AuctionItem = () => {
  const { auctionId } = useParams();
  // const ReactWaterMark = require('react-watermark-component')

  // interface AuctionData {
  //   username: string;
  //   description: string;
  //   profileImage: string;
  //   coverImage: string;
  // }
  // interface currentBid {
  //   amount: number;
  //   username: string;
  // }
  // interface bidHistories {
  //   amount: number;
  //   username: string;
  //   created: Date;
  //   profileImage: string;
  // }
  const [auctionData, setAuctionData] = useState();
  const [userData, setUserData] = useState();
  const [money, setMoney] = useState();

  const text = `${auctionData && auctionData.owner}`;
  const beginAlarm = function () { console.log('start alarm'); };
  const options = {
    chunkWidth: 200,
    chunkHeight: 60,
    textAlign: 'left',
    textBaseline: 'bottom',
    globalAlpha: 1,
    font: '14px Microsoft Yahei',
    rotateAngle: -0.26,
    fillStyle: '#1f1f1f'
  }


  const ownerData = (username) => {
    axios
      .get(`https://api.adoppix.com/api/User/${username}/user-info`)
      .then((res) => {
        console.log("Success:", res.data.data);
        setUserData(res.data.data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  const getAuction = () => {
    axios
      .get(`https://api.adoppix.com/api/Auction/${auctionId}`)
      .then((res) => {
        console.log("Success:", res.data.data);
        setAuctionData(res.data.data);
        ownerData(res.data.data.owner)
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const getUserMoney = async () => {
    const token = getToken();
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
      "Access-Control-Allow-Origin": "*",
    };

    let response = await axios({
      method: "get",
      url: `https://api.adoppix.com/api/User/money`,
      headers: headers
    }).catch(err => console.log(err.response))
    console.log(response.data.data)
    setMoney(response.data.data)
  }

  useEffect(() => {

    setTimeout(() => {
      getAuction();
      getUserMoney();
    }, 1000);
  }, []);


  return (
    <div className="bg-adoplight dark:bg-adopdark">

      <div className="py-14">
        <div className="container m-auto min-h-screen">
          <div className="grid grid-cols-12 gap-4">
            <div className=" ml-5 mr-5 col-span-9 space-y-3  ">
              <div className="p-5 bg-adopsoftdark rounded-lg">
                {
                  auctionData && (
                    <div>

                      <ReactWaterMark
                        waterMarkText={text}
                        openSecurityDefense
                        securityAlarm={beginAlarm}
                        options={options}
                      >


                        <div className="relative">
                          <div>
                            <img draggable={false} className="h-[500px] object-cover w-full m-atuo inline-flex rounded-lg shadow-lg blur-sm brightness-75" src={`https://pix.adoppix.com/public/${auctionData.images[0]}`} alt="" />
                          </div>
                          <div className="absolute top-0 m-auto left-0 right-0 ">
                            <p className="text-center">
                              <img draggable={false} className="h-[500px] m-atuo inline-flex rounded-lg shadow-lg" src={`https://pix.adoppix.com/public/${auctionData.images[0]}`} onDragStart={(event) => event.preventDefault()} alt="" />
                            </p>
                          </div>

                        </div>
                      </ReactWaterMark>
                    </div>
                  )
                }
              </div>
              <div className="p-5 bg-adopsoftdark rounded-lg">
                {
                  auctionData && (
                    <div>

                      <div>
                        <div>
                          {auctionData.title}
                        </div>
                        {userData &&

                          <div className="flex my-5 cursor-pointer">
                            <div>
                              <img className="h-[40px] w-[40px] rounded-full" src={`https://pix.adoppix.com/public/${userData.profileImage}`} />
                            </div>
                            <div className="my-auto">
                              <p className="px-3 text-lg">
                                {userData.username}
                              </p>
                            </div>
                          </div>
                        }
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
                                <div key={index} className="py-1 px-1  rounded-lg flex  ">
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
                  )
                }
              </div>
              <div className="p-5 bg-adopsoftdark rounded-lg min-h-[300px]">
                {
                  auctionData && (
                    <div>

                      <div>
                        <div>
                          ประวัติการประมูล
                        </div>

                      </div>




                    </div>
                  )
                }
              </div>
            </div>
            <div className="bg-adopsoftdark mr-5 col-span-3 h-[600px] w-full rounded-lg">

              <div className="p-4">
                <div className="text-right">
                  <p>
                    {money && money}
                  </p>
                </div>
                <div className="mt-14">
                  <Countdown date="2023-02-15 11:11:33.467" renderer={renderer} />
                </div>

                <div className="mx-10 mt-4">
                  <div className="flex justify-between">
                    <div className="text-sm">start price : 500</div>
                    <div className="text-sm">mini bids : 20</div>
                  </div>
                </div>

                {userData && (

                  <div className="mt-8 mx-10">
                    <div className="text-right text-4xl font-bold text-adoppix">3900</div>
                    <div><hr className="my-2" /></div>
                    <div className="flex justify-end">
                      <div className="my-auto px-2 text-lg font-bold">By</div>
                      <div> <img className="h-[30px] w-[30px] rounded-full " src={`https://pix.adoppix.com/public/${userData.profileImage}`} /></div>
                      <div className="text-lg truncate w-[auto] my-auto px-2">   {userData.username}</div>
                    </div>
                  </div>
                )}
                <div className="mt-14">
                  <div className="flex justify-center">
                    <div className="w-14 h-9 py-2 text-center mx-1 text-sm font-bold px-4 rounded-lg  bg-adoppix text-adoplight ">x1.2</div>
                    <div className="w-14 h-9 py-2 text-center mx-1 text-sm font-bold px-4 rounded-lg  bg-adoppix text-adoplight ">x1.5</div>
                    <div className="w-14 h-9 py-2 text-center mx-1 text-sm font-bold px-4 rounded-lg  bg-adoppix text-adoplight ">x2</div>
                    <div className="w-14 h-9 py-2 text-center mx-1 text-sm font-bold px-4 rounded-lg  bg-adoppix text-adoplight ">x3</div>
                    <div className="w-14 h-9 py-2 text-center mx-1 text-sm font-bold px-4 rounded-lg  bg-adoppix text-adoplight ">x4</div>
                  </div>
                  <div>
                    <div className="mt-4">
                      <input type="text" id="default-input" className="mt-2 mx-auto  bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-gray-400 focus:border-gray-400 block w-[70%] p-2.5 dark:bg-adopdark dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-gray-400 dark:focus:border-gray-400" />
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>




    </div>
  );
};

const Completionist = () => <span>You are good to go!</span>;

// Renderer callback with condition
const renderer = ({ days, hours, minutes, seconds, completed }) => {
  if (completed) {
    // Render a complete state
    return <Completionist />;
  } else {
    // Render a countdown
    return (
      <span >
        <div className="">
          <div className="flex m-auto justify-center">
            { /*    <div className="p-4 bg-adopdark rounded-lg">{zeroPad(days)} </div>
          <p className="my-auto mx-2">
            :
    </p> */}
            <div className="p-4 bg-adopdark rounded-lg">{zeroPad(hours)} </div>
            <p className="my-auto mx-2 font-black">
              :
            </p>
            <div className="p-4 bg-adopdark rounded-lg">{zeroPad(minutes)} </div>
            <p className="my-auto mx-2 font-black">
              :
            </p>
            <div className="p-4 bg-adopdark rounded-lg">{zeroPad(seconds)} </div>
          </div>
        </div>
      </span>
    );
  }
};
