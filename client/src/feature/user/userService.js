import axios from "axios";
import { baseUrl } from "../../utils/baseUrl";

export const addToCart = async ({ cartData, token }) => {
  const res = await axios.post(`${baseUrl}/cart`, cartData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

export const getCart = async ({ token }) => {
  const res = await axios.get(`${baseUrl}/cart`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

export const removeCartItem = async ({ token, cartId }) => {
  const res = await axios.delete(`${baseUrl}/cart/remove/${cartId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

export const updateQty = async ({ token, cartId, quantity }) => {
  const res = await axios.patch(
    `${baseUrl}/cart/updateQty/${cartId}`,
    { quantity },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return res.data;
};

export const processOrder = async ({ token, data }) => {
  const res = await axios.post(`${baseUrl}/order/cash`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

export const getOrders = async ({ token }) => {
  const res = await axios.get(`${baseUrl}/order/user`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

export const updateUser = async ({ token, data }) => {
  const res = await axios.patch(`${baseUrl}/update-user`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};
