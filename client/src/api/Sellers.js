import axios from "axios";

export const getSellers = async (market) => 
    await axios.get(`http://localhost:3000/api/sellers/${market}`)

export const getSeller = async (market, seller) => 
    await axios.get(`http://localhost:3000/api/sellers/${market}/${seller}`)

export const sendSeller = async (seller, market_id) => 
    await axios.post(`http://localhost:3000/api/sellers/${market_id}`, seller)

export const updateSeller = async (seller_id, seller) => 
    axios.patch(`http://localhost:3000/api/sellers/1/${seller_id}`, seller)

export const deleteSeller = async (seller_id, market_id) => 
    await axios.delete(`http://localhost:3000/api/sellers/${market_id}/${seller_id}/`)
