import axios from "axios";

export const signinSeller = async (seller) =>
  axios.post(`http://localhost:3000/api/signin`, seller);
