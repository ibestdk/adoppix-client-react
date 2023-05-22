import axios from "axios";
import { apiPath } from "./envService";
import { getToken } from "./authorize";
const token = getToken();


// export const getAPIBalance = async () => {
//     const headers = {
//         Authorization: `Bearer ${token}`,
//         "Access-Control-Allow-Origin": "*",
//     };
//     axios
//         .get(`https://api.adoppix.com/api/User/money`, { headers })
//         .then((res) => {
//             //console.log(res.data.data)
//             return res.data.data;
//         })
//         .catch((error) => {
//             console.error("Error:", error);
//         });
  
  
//   }
  

  export const getAPIBalance = async () => {
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
      "Access-Control-Allow-Origin": "*",
    };
    let response = await axios({
      method: "get",
      url: `https://api.adoppix.com/api/User/money`,
      headers: headers,
    }).catch((err) => console.log(err.response));
    return response.data.data;
  };