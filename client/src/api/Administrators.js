import axios from "axios";

export const getAdministrators = async (market) => 
    await axios.get(`http://localhost:3000/api/admnistrators/${market}`)

export const sendAdministrator = async (market, administrator) => 
    await axios.post(`http://localhost:3000/api/administrators/${market}`, administrator)