import axios from "axios";

export const getMarket = async (market_id) => 
    await axios.get(`http://localhost:3000/api/markets/${market_id}`)