import axios from "axios";

export const getSellers = async () => 
    await axios.get(`http://localhost:3000/api/sellers/1`)

export const sendSeller = async (seller) => 
    await axios.post(`http://localhost:3000/api/sellers/1`, seller)

export const updateSeller = async (seller_id, seller) => 
    axios.patch(`http://localhost:3000/api/sellers/1/${seller_id}`, seller)

export const deleteSeller = async (seller_id) => 
    await axios.delete(`http://localhost:3000/api/sellers/1/${seller_id}/`)