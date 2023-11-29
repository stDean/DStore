import axios from "axios";
import { baseUrl } from "../../utils/baseUrl";

export const getBrands = async token => {
  const res = await axios.get(`${baseUrl}/brand`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};
