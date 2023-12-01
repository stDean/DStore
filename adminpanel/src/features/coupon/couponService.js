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
  console.log(res.data);
  return res.data;
};
