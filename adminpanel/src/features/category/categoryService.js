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
