import axios from "axios";
import { baseUrl } from "../../utils/baseUrl";

export const getOrders = async ({ token }) => {
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

export const getOrdByUserId = async ({ id, token, orderId }) => {
  const res = await axios.get(`${baseUrl}/order/user/${id}/${orderId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

export const getMonthlyOrder = async ({ token }) => {
  const res = await axios.get(`${baseUrl}/order/getMonthData`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

export const getYearlyOrder = async ({ token }) => {
  const res = await axios.get(`${baseUrl}/order/getYearlyOrder`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

export const updateOrder = async ({ token, orderId, data }) => {
  const res = await axios.patch(
    `${baseUrl}/order/update/${orderId}`,
    { status: data },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return res.data;
};
