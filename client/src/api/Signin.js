import axios from "axios";


axios.defaults.withCredentials = true;

export const signinSeller = async (seller) =>
  axios.post(`http://localhost:3000/api/signin`, seller);

export const logout = async () => 
  axios.post(`http://localhost:3000/api/signout`)
