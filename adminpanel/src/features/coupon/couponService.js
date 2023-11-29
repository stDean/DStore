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
