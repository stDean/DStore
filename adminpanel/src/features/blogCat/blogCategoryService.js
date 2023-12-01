import axios from "axios";
import { baseUrl } from "../../utils/baseUrl";

export const getBlogCategory = async () => {
  const res = await axios.get(`${baseUrl}/blog-category`);
  return res.data;
};

export const createBlogCategory = async ({ data, token }) => {
  const res = await axios.post(`${baseUrl}/blog-category`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};
