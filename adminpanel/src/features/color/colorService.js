import axios from "axios";
import { baseUrl } from "../../utils/baseUrl";

export const getColors = async () => {
  const res = await axios.get(`${baseUrl}/color`);
  return res.data;
};

export const createColor = async ({ data, token }) => {
  const res = await axios.post(`${baseUrl}/color`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

export const getColor = async ({ id }) => {
  const res = await axios.get(`${baseUrl}/color/${id}`);
  return res.data;
};

export const editColor = async ({ id, token, data }) => {
  const res = await axios.patch(`${baseUrl}/color/${id}`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

export const deleteColor = async ({ id, token }) => {
  const res = await axios.delete(`${baseUrl}/color/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};
