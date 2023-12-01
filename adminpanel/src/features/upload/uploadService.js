import axios from "axios";
import { baseUrl } from "../../utils/baseUrl";

export const uploadImg = async ({ data, token }) => {
  const res = await axios.post(`${baseUrl}/product/upload`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

export const deleteImg = async ({ token, id }) => {
  const res = await axios.delete(`${baseUrl}/product/delete-image/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};
