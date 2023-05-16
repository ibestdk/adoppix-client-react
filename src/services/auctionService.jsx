import axios from "axios";
import { getToken } from "./authorize";
import { apiPath } from "./envService";
const token = getToken();
const take = 5;


export const callAuctionFilterCard = async (tags, page) => {
  let headers = {};
  if (token === false || token === undefined) {
    headers = {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    };
  } else {
    headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    };
  }

  try {
    const response = await axios.get(
      `${apiPath}api/auction`,
      {
        params: {
          Tag: tags,
          // MinimumAmount: value[0],
          // MaximumAmount: value[1],
          Take: take,
          Page: page,
        },
        headers: headers,
      }
    );
    return response.data.data;
  } catch (error) {
    console.log(error.response);
    return null;
  }
};


export const callAuctionCard = async (page) => {
  const headers = {
    Authorization: `Bearer ${token}`,
    "Content-Type": "multipart/form-data",
    "Access-Control-Allow-Origin": "*",
  };
  let response = await axios({
    method: "get",
    url: `${apiPath}api/auction?take=${take}&page=${page}`,
    headers: headers,
  }).catch((err) => console.log(err.response));
  return response.data.data;
};


export const getAuctionLike = async () => {
  const headers = {
    Authorization: `Bearer ${token}`,
    "Content-Type": "multipart/form-data",
    "Access-Control-Allow-Origin": "*",
  };
  let response = await axios({
    method: "get",
    url: `${apiPath}api/User/like/auction`,
    headers: headers,
  }).catch((err) => console.log(err.response));
  return response.data.data;
};

export const auctionLike = async (auctionId) => {
  const headers = {
    Authorization: `Bearer ${token}`,
    "Content-Type": "multipart/form-data",
    "Access-Control-Allow-Origin": "*",
  };

  let result = await axios({
    method: "post",
    url: `${apiPath}api/Auction/${auctionId}/like`,
    headers: headers,
  }).catch((err) => console.log(err.response));
  console.log("Success", result.data.data);
  return result.data.data;
};

export const auctionCreate = async (bodyData) => {
  const headers = {
    Authorization: `Bearer ${token}`,
    "Content-Type": "multipart/form-data",
    "Access-Control-Allow-Origin": "*",
  };

  // ถ้าเป็น Promise (พวกใช้ .then ทั้งหลาย) แนะนำให้ใช้ await ไปเลย
  let result = await axios({
    method: "post",
    url: `${apiPath}api/Auction`,
    data: bodyData,
    headers: headers,
  }).catch((err) => console.log(err.response));
  return result.data.data;
};


export const getAuctionId = (auctionId) => {
  axios
    .get(`https://api.adoppix.com/api/Auction/${auctionId}`)
    .then((res) => {
      setAuctionData(res.data.data);
      if (res.data.data.stopTime !== null) {
        const dateTime = res.data.data.stopTime;
        const timeString = dateTime.toLocaleString().replace("T", " ");
        const [date, time] = timeString.split(" ");
        setDateExpire(date);
        setTimeExpire(time);
      }
      ownerData(res.data.data.owner);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
};



export const callrecommentOnItems = async (username) => {
  const headers = {
    Authorization: `Bearer ${token}`,
    "Content-Type": "multipart/form-data",
    "Access-Control-Allow-Origin": "*",
  };
  let response = await axios({
    method: "get",
    url: `${apiPath}api/User/${username}/auction?take=3&page=0`,
    headers: headers,
  }).catch((err) => console.log(err.response));
  return response.data.data;
};