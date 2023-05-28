import axios from "axios";
import { apiPath } from "./envService";
import { getToken } from "./authorize";
const token = getToken();




export const getQandA = async () => {
  const headers = {
    Authorization: `Bearer ${token}`,
    "Content-Type": "multipart/form-data",
    "Access-Control-Allow-Origin": "*",
  };
  let response = await axios({
    method: "get",
    url: `https://api.backoffice.adoppix.com/api/QA`,
    headers: headers,
  }).catch((err) => console.log(err.response));
  return response.data.data;
};
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


export const postQnA = async (bodyData) => {
    const headers = {
      Authorization: `Bearer ${getToken()}`,
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    };
  
    let result = await axios({
      method: "post",
      url: `https://api.backoffice.adoppix.com/api/QA`,
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