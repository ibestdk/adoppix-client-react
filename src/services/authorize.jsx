import axios from "axios";
import { apiPath } from "./envService";

//store token ==> session storage

export const authenicate = (response, next) => {
  if (window !== undefined) {
    //save data to session storage
    localStorage.setItem("token", response.data);
    console.log("sessionStroage was stored");
    getUserDataApi(response.data);
  }
  setTimeout(() => {
    next();
  }, 500);
};

//get user data after login

export const getUserDataApi = (token) => {
  console.log("called getuserDataAPI");
  if (window !== undefined) {
    if (localStorage.getItem("token")) {
      if (token) {
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

        axios.get(`${apiPath}api/User/user-info`).then((res) => {
          console.log(res.data);
          localStorage.setItem("user", JSON.stringify(res.data.data));
          console.log("saved user data");
        });
      } else {
        axios.defaults.headers.common["Authorization"] = null;
      }
    } else {
      return false;
    }
  }
};




//logout
export const logout = (next) => {
  if (window !== undefined) {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("theme");
  }
  next();
};

//bring data token

export const getToken = () => {
  if (window !== undefined) {
    if (localStorage.getItem("token")) {
      return localStorage.getItem("token");
    } else {
      return false;
    }
  }
};

//bring data user

export const getUser = () => {
  if (window !== undefined) {
    if (localStorage.getItem("user")) {
      // console.log(localStorage.getItem("user"));
      return JSON.parse(localStorage.getItem("user"));
    } else {
      return false;
    }
  }
};



export const changePasswordAPI = async (bodyData) => {
  const headers = {
    Authorization: `Bearer ${getToken()}`,
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  };

  let result = await axios({
    method: "post",
    url: `${apiPath}api/Auth/change-password`,
    data: bodyData,
    headers: headers,
  }).catch((err) => console.log(err.response));
  console.log("Success", result.data.data);
  return result.data.data;
};