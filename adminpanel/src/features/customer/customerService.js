import axios from "axios";
import { baseUrl } from "../../utils/baseUrl";

export const getUsers = async token => {
  const res = await axios.get(`${baseUrl}/users`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};
