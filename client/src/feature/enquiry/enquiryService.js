import axios from "axios";
import { baseUrl } from "../../utils/baseUrl";

export const postEnq = async ({ data }) => {
  const res = await axios.post(`${baseUrl}/enquiry`, data);
  return res.data;
};
