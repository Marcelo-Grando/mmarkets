import axios from "axios";

export const getSellers = async () => 
    await axios.get(`http://localhost:3000/sellers/1`)

export const sendSeller = async (seller) => 
    await axios.post(`http://localhost:3000/sellers/1`, seller)