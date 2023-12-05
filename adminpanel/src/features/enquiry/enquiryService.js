import axios from "axios";
import { baseUrl } from "../../utils/baseUrl";

export const getEnquires = async () => {
  const res = await axios.get(`${baseUrl}/enquiry`);
  return res.data;
};

export const deleteEnq = async ({ id, token }) => {
  const res = await axios.delete(`${baseUrl}/enquiry/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

export const getEnq = async id => {
  const res = await axios.get(`${baseUrl}/enquiry/${id}`);
  return res.data;
};

export const editEnq = async ({ id, token, data }) => {
  const res = await axios.patch(
    `${baseUrl}/enquiry/${id}`,
    { status: data },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return res.data;
};
