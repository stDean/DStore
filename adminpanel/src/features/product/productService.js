import axios from "axios";
import { baseUrl } from "../../utils/baseUrl";

export const getProducts = async () => {
  const res = await axios.get(`${baseUrl}/product`);
  return res.data;
};

export const createProduct = async ({ data, token }) => {
  const res = await axios.post(`${baseUrl}/product`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

export const getProduct = async ({ id }) => {
  const res = await axios.get(`${baseUrl}/product/${id}`);
  return res.data;
};

export const editProduct = async ({ id, token, data }) => {
  const res = await axios.patch(`${baseUrl}/product/${id}`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

export const deleteProduct = async ({ id, token }) => {
  const res = await axios.delete(`${baseUrl}/product/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};
