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
