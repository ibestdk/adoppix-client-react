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
    //console.log(error.response);
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
    //console.log(error.response);
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
    //console.log(error.response);
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
    //console.log(error.response);
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
    //console.log(response);
    return response.data.data;
  } catch (error) {
    //console.log(error.response);
    return null;
  }
};

export const postBuyALLCarts = function () {
  const token = getToken();
  const headers = {
    Authorization: `Bearer ${token}`,
    "Access-Control-Allow-Origin": "*",
  };

  axios
    .post(`https://api.adoppix.com/api/Product/buys`, { headers })
    .then(async (res) => {
      return res.data.message;
    })
    .catch((error) => {
      console.error("Error:", error);
    });
};

export const postToWishList = (id) => {
  //console.log(id);
  const token = getToken();
  const headers = {
    Authorization: `Bearer ${token}`,
    "Access-Control-Allow-Origin": "*",
  };

  axios({
    method: "patch",
    url: `https://api.adoppix.com/api/Product/${id}/wishlist`,
    headers: headers,
  })
    .then((res) => {
      return res.data.message;
    })
    .catch((err) => console.log(err));
};

export const removeCartFromList = function (id, index) {
  const token = getToken();
  const headers = {
    Authorization: `Bearer ${token}`,
    "Access-Control-Allow-Origin": "*",
  };

  axios
    .post(`https://api.adoppix.com/api/Product/${id}/toggle-cart`, {
      headers,
    })
    .then((res) => {
      removeFromList(index);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
};

export const postBuySigle = async (productId) => {
  const headers = {
    Authorization: `Bearer ${token}`,
    "Access-Control-Allow-Origin": "*",
  };

  try {
    const response = await axios({
      method: "post",
      url: `${apiPath}api/Product/${productId}/buy`,
      headers: headers,
    });
    return response.data.message;
  } catch (error) {
    //console.log(error.response);
    return null;
  }
};

export const postBuyMulti = async (json) => {
  const headers = {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  };

  try {
    const response = await axios({
      method: "post",
      url: `${apiPath}api/Product/buy/cart`,
      headers: headers,
      data: json,
    });
    return response.data.message;
  } catch (error) {
    //console.log(error.response);
    return null;
  }
};
