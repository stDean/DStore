import axios from "axios";
import { baseUrl } from "../../utils/baseUrl";

export const getProducts = async () => {
  const res = await axios.get(`${baseUrl}/product`);
  return res.data;
};

export const addToWishList = async ({ productId, token }) => {
  const res = await axios.patch(
    `${baseUrl}/wishlist`,
    { productId },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return res.data;
};

export const getWishList = async ({ token }) => {
  const res = await axios.get(`${baseUrl}/wishlist`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
};

export const product = async ({ id }) => {
  const res = await axios.get(`${baseUrl}/product/${id}`);
  return res.data;
};
