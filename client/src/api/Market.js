import axios from "axios";

// export const getMarket = async (market_id) => 
//     await axios.get(`http://localhost:3000/api/markets/${market_id}`)

export const getUserData = async (user_id, user_roles) => 
    await axios.get(`http://localhost:3000/api/markets/${user_id}/${user_roles}`)