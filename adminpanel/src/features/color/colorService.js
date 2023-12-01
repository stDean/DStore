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
