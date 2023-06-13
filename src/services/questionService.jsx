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
    url: `https://api.backoffice.adoppix.com/api/QA/client`,
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


export const postReply = async (id , data) => {
    const headers = {
      Authorization: `Bearer ${getToken()}`,
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    };
  
    let result = await axios({
      method: "post",
      url: `https://api.backoffice.adoppix.com/api/QA/${id}/reply`,
      data: data,
      headers: headers,
    }).catch((err) => console.log(err.response));
    //console.log("Success", result.data.data);
    return result.data.data;
  };
  
  export async function replyQa(id, message) {
    const headers = {
        Authorization: `Bearer ${token}`,
        'Access-Control-Allow-Origin': '*',
    };

    let result = await axios({
        method: 'post',
        url: `https://api.backoffice.adoppix.com/api/qa/${id}/reply`,
        headers: headers,
        data: {
            message: message
        }
    }).catch((err) => console.log(err));

    return result.data.data;
} 
  export async function deleteCard() {
    const headers = {
        Authorization: `Bearer ${token}`,
        'Access-Control-Allow-Origin': '*',
    };

    let result = await axios({
        method: 'delete',
        url: `https://api.adoppix.com/api/User/credit-card?cardNumber=4242424242424242`,
        headers: headers,
    }).catch((err) => console.log(err));

    return result.data.data;
} 