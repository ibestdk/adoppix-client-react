import axios from "axios";
import { getToken } from "./authorize";
import { apiPath } from "./envService";
import { getRelativeTime } from "./apiService";
const token = getToken();
const take = 10;


export const getFeeds = async (page) => {
  const headers = {
    Authorization: `Bearer ${token}`,
    "Content-Type": "multipart/form-data",
    "Access-Control-Allow-Origin": "*",
  };

  let result = await axios({
    method: "get",
    url: `https://api.adoppix.com/api/Post?take=${take}&page=${page}`,
    headers: headers,
  }).catch((err) => console.log(err.response));
  console.log("new api coming 🔥🔥✨" , result)
  if (result.data.data.postList[0].created !== null) {
    const chatListWithRelativeTime = result.data.data.postList.map((feed) => {
      try {
        return {
          ...feed,
          relativeTime: getRelativeTime(feed.created),
        };
      } catch (error) {
        return feed;
      }
    });
    result.data.data.postList = chatListWithRelativeTime;
    return result.data.data;
  }
  return [];
};

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
    if (response.data.data[0].created !== null) {
      const chatListWithRelativeTime = response.data.data.map((feed) => {
        try {
          return {
            ...feed,
            relativeTime: getRelativeTime(feed.created),
          };
        } catch (error) {
          return feed;
        }
      });
      response.data.data = chatListWithRelativeTime;
      return response.data.data;
    }
    return [];
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
  
export const deleteFeeds = async (feedsId) => {
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
      "Access-Control-Allow-Origin": "*",
    };
    let response = await axios({
      method: "delete",
      url: `${apiPath}api/Post/${feedsId}`,
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


  export const createNewPost= async ( bodyData) => {
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
      "Access-Control-Allow-Origin": "*",
    };
  
    let result = await axios({
      method: "post",
      url: "https://api.adoppix.com/api/Post",
      data: bodyData,
      headers: headers,
    }).catch((err) => console.log(err.response));
    console.log("Success", result.data.data);
    return result.data.message;
  };