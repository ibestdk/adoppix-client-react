import Countdown, { zeroPad } from "react-countdown";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import CircularProgress from "@mui/material/CircularProgress";
import React from "react";
export const AuctionItem = () => {
  const { auctionId } = useParams();

  interface AuctionData {
    username: string;
    description: string;
    profileImage: string;
    coverImage: string;
  }
  interface currentBid {
    amount: number;
    username: string;
  }
  interface bidHistories {
    amount: number;
    username: string;
    created: Date;
    profileImage: string;
  }
  const [auctionData, setAuctionData] = useState<AuctionData>();



  const getAuction = () => {
    axios
      .get(`https://api.adoppix.com/api/Auction/${auctionId}`)
      .then((res) => {
        console.log("Success:", res.data);
        // if (res.data.status) {
        //   // console.log(res.data.data);
        //   setTimeout(() => {
        //     setData(res.data.data);
        //   }, 1000);
        //   setTimeout(() => {
        //     console.log("data :");
        //     console.log(data);
        //     setIsLoading(false);
        //   }, 1000);

        //   console.log("complete Get User data");
        // } else {
        //   console.log("fail to get user data");
        // }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  useEffect(() => {

    setTimeout(() => {
      getAuction();
    }, 1000);
  }, []);


  return (
    <div className="bg-adoplight dark:bg-adopdark">

      <div className="relative top-14">
        <div className="container m-auto">
          <div className="grid grid-cols-12 gap-4">
            <div className="bg-adopsoftdark ml-5 mr-5 col-span-8  h-[600px] rounded-lg">

            </div>
            <div className="bg-adopsoftdark mr-5 col-span-4 h-[1000px] w-full rounded-lg">

              <Countdown date="2023-02-15 11:11:33.467" renderer={renderer} />

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
      <span>
        <div className="flex">
          <div className="box p-4 bg-adopsoftdark rounded-lg">{zeroPad(days)} </div>:
          <div className="box p-4 bg-adopsoftdark rounded-lg">{zeroPad(hours)} </div>:
          <div className="box p-4 bg-adopsoftdark rounded-lg">{zeroPad(minutes)} </div>:
          <div className="box p-4 bg-adopsoftdark rounded-lg">{zeroPad(seconds)} </div>
        </div>
      </span>
    );
  }
};
