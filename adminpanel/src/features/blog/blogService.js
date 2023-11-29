import axios from "axios";
import { baseUrl } from "../../utils/baseUrl";

export const getBlogs = async () => {
  const res = await axios.get(`${baseUrl}/blog`);
  return res.data;
};
