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

export const getBlog = async id => {
  const res = await axios.get(`${baseUrl}/blog/${id}`);
  return res.data;
};

export const editBlog = async ({ id, token, data }) => {
  const res = await axios.patch(
    `${baseUrl}/blog/${id}`,
    { ...data },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return res.data;
};

export const deleteBlog = async ({ id, token }) => {
  const res = await axios.delete(`${baseUrl}/blog/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};
