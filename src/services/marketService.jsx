import axios from "axios";
import { apiPath } from "./envService";
import { getToken } from "./authorize";

const token = getToken();
const take = 20;

export const callAuctionCard = async (page) => {
  const headers = {
    Authorization: `Bearer ${token}`,
    "Access-Control-Allow-Origin": "*",
  };
  try {
    const response = await axios({
      method: "get",
      url: `${apiPath}api/auction?take=${take}&page=${page}`,
      headers: headers,
    });
    return response.data.data;
  } catch (error) {
    console.log(error.response);
    return null;
  }
};

export const CallMarketFilter = async () => {
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
    const response = await axios({
      method: "get",
      url: `${apiPath}api/Product/filters`,
      headers: headers,
    });
    return response.data.data;
  } catch (error) {
    console.log(error.response);
    return null;
  }
};

export const CallApiMarketList = async (tags, value, page) => {
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
    const response = await axios.get(`${apiPath}api/Product`, {
      params: {
        Tag: tags,
        MinimumAmount: value[0],
        MaximumAmount: value[1],
        Take: take,
        Page: page,
      },
      headers: headers,
    });
    return response.data.data;
  } catch (error) {
    console.log(error.response);
    return null;
  }
};

export const getWishListsAPI = async () => {
  const headers = {
    Authorization: `Bearer ${token}`,
    "Access-Control-Allow-Origin": "*",
  };
  try {
    const response = await axios({
      method: "get",
      url: `${apiPath}api/User/wishlist`,
      headers: headers,
    });
    return response.data.data;
  } catch (error) {
    console.log(error.response);
    return null;
  }
};

export const getCartAPI = async () => {
  const headers = {
    Authorization: `Bearer ${token}`,
    "Access-Control-Allow-Origin": "*",
  };
  try {
    const response = await axios({
      method: "get",
      url: `${apiPath}api/User/cart`,
      headers: headers,
    });
    console.log(response)
    return response.data.data;
  } catch (error) {
    console.log(error.response);
    return null;
  }
};
