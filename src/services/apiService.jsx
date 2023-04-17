import axios from "axios";
import { getToken } from "./authorize";
import moment from "moment";
const token = getToken();
export const getFeeds = async () => {
  const headers = {
    Authorization: `Bearer ${token}`,
    "Content-Type": "multipart/form-data",
    "Access-Control-Allow-Origin": "*",
  };

  let result = await axios({
    method: "get",
    url: `https://api.adoppix.com/api/Post?take=10&page=0`,
    headers: headers,
  }).catch((err) => console.log(err.response));
  if (result.data.data[0].created !== null) {
    const chatListWithRelativeTime = result.data.data.map((feed) => {
      try {
        return {
          ...feed,
          relativeTime: getRelativeTime(feed.created),
        }
      } catch (error) {
        return feed;
      }
    });
    return chatListWithRelativeTime;
  }
  return [];
};

const getRelativeTime = (datetime) => {
  const now = moment();
  const then = moment(datetime);
  const duration = moment.duration(now.diff(then));

  if (duration.asSeconds() < 60) {
    return "ตอนนี้";
  } else if (duration.asMinutes() < 60) {
    return `${Math.floor(duration.asMinutes())} นาที${
      duration.asMinutes() > 1 ? "" : ""
    }`;
  } else if (duration.asHours() < 24) {
    return `${Math.floor(duration.asHours())} ชม.${
      duration.asHours() > 1 ? "" : ""
    }`;
  } else if (duration.asDays() < 7) {
    return `${Math.floor(duration.asDays())} วัน${
      duration.asDays() > 1 ? "" : ""
    }`;
  } else if (duration.asDays() < 30) {
    return `${Math.floor(duration.asDays() / 7)} สัปดาห์${
      duration.asDays() > 7 ? "" : ""
    }`;
  } else if (duration.asDays() < 365) {
    return `${Math.floor(duration.asDays() / 30)} เดือน${
      duration.asDays() > 30 ? "" : ""
    }`;
  } else {
    return `${Math.floor(duration.asDays() / 365)} ปี${
      duration.asDays() > 365 ? "" : ""
    }`;
  }
};


export const postLike = async (postId) => {
  console.log(postId)
  const headers = {
    Authorization: `Bearer ${token}`,
    "Content-Type": "multipart/form-data",
    "Access-Control-Allow-Origin": "*",
  };

  let result = await axios({
    method: "put",
    url: `https://api.adoppix.com/api/Post/${postId}/like`,
    headers: headers,
  }).catch((err) => console.log(err.response));
  console.log(result);
  return result;
};

export const getSearchUser = async (defaultValue) => {
  if (!defaultValue) return null;
  try {
    const response = await axios.get(
      `https://api.adoppix.com/api/Search/${defaultValue}/users`,
      {
        params: { take: 10, page: 0 },
      }
    );
    if (response?.data?.status) {
      return response?.data?.data;
    }
  } catch (error) {}
};


export const getNotification = async () => {
  console.log('getNotification called')
  const headers = {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  };
  try {
    const response = await axios.get(
      `https://api.adoppix.com/api/User/notification`,
      {
        params: { take: 10, page: 0 },
        headers: headers,
      }
    );
    if (response.data.data[0].created !== null) {
      const chatListWithRelativeTime = response.data.data.map((noti) => {
        try {
          return {
            ...noti,
            relativeTime: getRelativeTime(noti.created),
          }
        } catch (error) {
          return noti;
        }
      });
      return chatListWithRelativeTime;
    }
    return [];


  } catch (error) {}
};

export const getChatList = async () => {
  const headers = {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  };

  let result = await axios({
    method: "get",
    url: "https://api.adoppix.com/api/Chat/rooms",
    headers: headers,
  }).catch((err) => console.log(err.response));

  if (result && result.data && result.data.data) {
    const chatListWithRelativeTime = result.data.data.map((chat) => ({
      ...chat,
      relativeTime: getRelativeTime(chat.lastTime),
    }));
    setChatList(chatListWithRelativeTime);
  }
};