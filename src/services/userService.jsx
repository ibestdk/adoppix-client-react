import axios from "axios";
import { apiPath } from "./envService";
import { getToken } from "./authorize";
const token = getToken();


export const getAPIBalance = async () => {
    const headers = {
        Authorization: `Bearer ${token}`,
        "Access-Control-Allow-Origin": "*",
    };
    axios
        .get(`https://api.adoppix.com/api/User/money`, { headers })
        .then((res) => {
            return res.data.data;
        })
        .catch((error) => {
            console.error("Error:", error);
        });
  
  
  }
  