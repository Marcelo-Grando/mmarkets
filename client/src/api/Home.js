import axios  from "axios";

export const createAccount = async (market) => 
    await axios.post(`http://localhost:3000/api/markets`, market)

export const createUser = async (user) => 
    await axios.post(`http://localhost:3000/api/users`, user)

export const createMarket = async (marketData) => 
    await axios.post(`http://localhost:3000/api/markets`, marketData)