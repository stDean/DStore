import axios from "axios";
import { baseUrl } from "../../utils/baseUrl";

export const getColors = async () => {
  const res = await axios.get(`${baseUrl}/color`);
  return res.data;
};
