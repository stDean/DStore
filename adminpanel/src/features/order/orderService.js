import axios from "axios";
import { baseUrl } from "../../utils/baseUrl";

export const getOrders = async token => {
  const res = await axios.get(`${baseUrl}/order`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

export const deleteOrd = async ({ id, token }) => {
  const res = await axios.delete(`${baseUrl}/order/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

export const getOrdByUserId = async ({ id, token }) => {
  const res = await axios.get(`${baseUrl}/order/user/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

export const editOrd = async ({ id, token, data }) => {
  const res = await axios.patch(
    `${baseUrl}/order/${id}`,
    { status: data },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return res.data;
};
