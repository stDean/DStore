import axios from "axios";
import { baseUrl } from "../../utils/baseUrl";

export const getBlogs = async () => {
  const res = await axios.get(`${baseUrl}/blog`);
  return res.data;
};

export const createBLogPost = async ({ data, token }) => {
  const res = await axios.post(`${baseUrl}/blog`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};
