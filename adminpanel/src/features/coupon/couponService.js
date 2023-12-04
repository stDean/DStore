import axios from "axios";
import { baseUrl } from "../../utils/baseUrl";

export const getCoupons = async token => {
  const res = await axios.get(`${baseUrl}/coupon`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

export const createCoupon = async ({ data, token }) => {
  const res = await axios.post(`${baseUrl}/coupon`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

export const getCoupon = async ({ id, token }) => {
  const res = await axios.get(`${baseUrl}/coupon/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

export const editCoupon = async ({ id, token, data }) => {
  const res = await axios.patch(`${baseUrl}/coupon/${id}`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

export const deleteCoupon = async ({ id, token }) => {
  const res = await axios.delete(`${baseUrl}/coupon/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};
