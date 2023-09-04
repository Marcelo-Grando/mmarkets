import axios  from "axios";

export const createAccount = async (market) => 
    await axios.post(`http://localhost:3000/api/markets`, market)