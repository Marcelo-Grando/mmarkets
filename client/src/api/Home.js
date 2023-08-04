import axios  from "axios";

export const sendMarket = async (market) => 
    await axios.post(`http://localhost:3000/api/markets`, market)