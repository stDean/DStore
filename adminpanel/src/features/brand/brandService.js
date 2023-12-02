import axios from "axios";
import { baseUrl } from "../../utils/baseUrl";

export const getBrands = async () => {
  const res = await axios.get(`${baseUrl}/brand`);
  return res.data;
};

export const getBrand = async id => {
  const res = await axios.get(`${baseUrl}/brand/${id}`);
  return res.data;
};

export const createBrand = async ({ data, token }) => {
  const res = await axios.post(`${baseUrl}/brand`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

export const editBrand = async ({ id, token, data }) => {
  const res = await axios.patch(`${baseUrl}/brand/${id}`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

export const deleteBrand = async ({ id, token }) => {
  const res = await axios.delete(`${baseUrl}/brand/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};
