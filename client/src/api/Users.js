import axios from "axios";

export const getUser = async (user_id, market_id) => 
    await axios.get(`http://localhost:3000/api/users/${user_id}/${market_id}`)