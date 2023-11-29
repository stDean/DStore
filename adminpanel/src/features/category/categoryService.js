import axios from "axios";
import { baseUrl } from "../../utils/baseUrl";

export const getProductCategory = async () => {
  const res = await axios.get(`${baseUrl}/product-category`);
  return res.data;
};
