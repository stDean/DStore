import axios from "axios";
import { baseUrl } from "../../utils/baseUrl";

export const login = async userData => {
  const res = await axios.post(`${baseUrl}/auth/admin-login`, userData);

  if (res.data) {
    localStorage.setItem("user", JSON.stringify(res.data));
  }

  return res.data;
};
