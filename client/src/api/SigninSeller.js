import axios from "axios";

export const signinSeller = async (seller) =>
  axios.post(`http://localhost:3000/api/signin`, seller);

export const getSellerByEmail = async (email) =>
  axios.get(`http://localhost:3000/api/seller/${email}`);
