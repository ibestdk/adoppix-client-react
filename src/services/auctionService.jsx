import axios from "axios";
import { getToken } from "./authorize";
import { apiPath } from "./envService";
const token = getToken();
const take = 20;

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
