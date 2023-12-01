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
