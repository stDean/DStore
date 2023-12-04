import axios from "axios";
import { baseUrl } from "../../utils/baseUrl";

export const getProductCategory = async () => {
  const res = await axios.get(`${baseUrl}/product-category`);
  return res.data;
};

export const createCategory = async ({ data, token }) => {
  const res = await axios.post(`${baseUrl}/product-category`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

export const getProdCat = async ({ id }) => {
  const res = await axios.get(`${baseUrl}/product-category/${id}`);
  return res.data;
};

export const editProdCat = async ({ id, token, data }) => {
  const res = await axios.patch(`${baseUrl}/product-category/${id}`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

export const deleteProdCat = async ({ id, token }) => {
  const res = await axios.delete(`${baseUrl}/product-category/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};
