import axios from "axios";
import { baseUrl } from "../../utils/baseUrl";

export const getEnquires = async () => {
  const res = await axios.get(`${baseUrl}/enquiry`);
  return res.data;
};