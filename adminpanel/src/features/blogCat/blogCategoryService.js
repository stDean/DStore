import axios from "axios";
import { baseUrl } from "../../utils/baseUrl";

export const getBlogCategory = async () => {
  const res = await axios.get(`${baseUrl}/blog-category`);
  return res.data;
};

export const getSingleBlogCategory = async id => {
  const res = await axios.get(`${baseUrl}/blog-category/${id}`);
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

export const editBlogCategory = async ({ id, token, data }) => {
  const res = await axios.patch(`${baseUrl}/blog-category/${id}`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

export const deleteBlogCategory = async ({ id, token }) => {
  const res = await axios.delete(`${baseUrl}/blog-category/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};
