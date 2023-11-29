import axios from "axios";
import { baseUrl } from "../../utils/baseUrl";

export const getProducts = async () => {
  const res = await axios.get(`${baseUrl}/product`);
  return res.data;
};
