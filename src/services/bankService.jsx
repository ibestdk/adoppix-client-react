import axios from "axios";
import { apiPath } from "./envService";
import { getToken, getUser } from "./authorize";
const token = getToken();
const user = getUser();



export const getBank = async () => {
  const headers = {
    Authorization: `Bearer ${token}`,
    "Content-Type": "multipart/form-data",
    "Access-Control-Allow-Origin": "*",
  };
  let response = await axios({
    method: "get",
    url: `${apiPath}api/User/bank`,
    headers: headers,
  }).catch((err) => console.log(err.response));
  return response.data.data;
};


export const getTopUpLogs = async () => {
  const headers = {
    Authorization: `Bearer ${token}`,
    "Content-Type": "multipart/form-data",
    "Access-Control-Allow-Origin": "*",
  };
  let response = await axios({
    method: "get",
    url: `${apiPath}api/Payment/topup/logs`,
    headers: headers,
  }).catch((err) => console.log(err.response));
  return response.data.data;
};

export const getWithDrawLogs = async () => {
  const headers = {
    Authorization: `Bearer ${token}`,
    "Content-Type": "multipart/form-data",
    "Access-Control-Allow-Origin": "*",
  };
  let response = await axios({
    method: "get",
    url: `https://api.backoffice.adoppix.com/api/Withdraw/${user.username}/logs`,
    headers: headers,
  }).catch((err) => console.log(err.response));
  return response.data.data;
};


export const postBank = async (bodyData) => {
    const headers = {
      Authorization: `Bearer ${getToken()}`,
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    };
  
    let result = await axios({
      method: "post",
      url: `${apiPath}api/User/bank`,
      data: bodyData,
      headers: headers,
    }).catch((err) => console.log(err.response));
    //console.log("Success", result.data.data);
    return result.data.data;
  };


export const postWithdraw = async (bodyData) => {
    const headers = {
      Authorization: `Bearer ${getToken()}`,
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    };
  
    let result = await axios({
      method: "post",
      url: `https://api.backoffice.adoppix.com/api/Withdraw`,
      data: bodyData,
      headers: headers,
    }).catch((err) => console.log(err.response));
    //console.log("Success", result.data.data);
    return result.data.data;
  };