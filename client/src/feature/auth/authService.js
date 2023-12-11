import axios from "axios";
import { baseUrl } from "../../utils/baseUrl";

export const register = async ({ userData }) => {
  const res = await axios.post(`${baseUrl}/auth/register`, userData);

  if (res.data) {
    localStorage.setItem("user", JSON.stringify(res.data));
  }

  return res.data;
};

export const login = async ({ userData }) => {
  const res = await axios.post(`${baseUrl}/auth/login`, userData);

  if (res.data) {
    localStorage.setItem("currentUser", JSON.stringify(res.data));
  }

  return res.data;
};

export const logout = async () => {
  const res = await axios.get(`${baseUrl}/auth/logout`);

  if (res.data) {
    localStorage.removeItem("currentUser");
  }

  return res.data;
};
