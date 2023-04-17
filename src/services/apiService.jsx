import axios from "axios";


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
