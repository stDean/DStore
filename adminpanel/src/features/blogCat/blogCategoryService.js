import axios from "axios";
import { baseUrl } from "../../utils/baseUrl";

export const getBlogCategory = async () => {
  const res = await axios.get(`${baseUrl}/blog-category`);
  return res.data;
};
