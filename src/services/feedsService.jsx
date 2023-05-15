import axios from "axios";
import { getToken } from "./authorize";
import { apiPath } from "./envService";
const token = getToken();
const take = 20;




export const getFeedsComment = async (feedsId) => {
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
      "Access-Control-Allow-Origin": "*",
    };
    let response = await axios({
      method: "get",
      url: `${apiPath}api/Post/${feedsId}/comment`,
      headers: headers,
    }).catch((err) => console.log(err.response));
    return response.data.data;
  };
  

  
export const putFeeds = async (feedsId ,bodyData) => {
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
      "Access-Control-Allow-Origin": "*",
    };
    let response = await axios({
      method: "put",
      url: `${apiPath}api/Post/${feedsId}`,
      data: bodyData,
      headers: headers,
    }).catch((err) => console.log(err.response));
    return response.data.message;
  };
  


  export const postFeedsComment = async (feedsId , bodyData) => {
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    };
  
    let result = await axios({
      method: "post",
      url: `${apiPath}api/Post/${feedsId}/comment`,
      data: JSON.stringify(bodyData),
      headers: headers,
    }).catch((err) => console.log(err.response));
    console.log("Success", result.data.data);
    return result.data.message;
  };


  const bids = async () => {
    const bodyData = {
      amount: 0,
    };
    if (bidsAuction) bodyData.amount = bidsAuction;
    console.log(bodyData);
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
    console.log(result);
    getAuction();
    getUserMoney();
  };
