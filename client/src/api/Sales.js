import axios from "axios";

export const getProducts = async (market_id) =>
  await axios.get(`http://localhost:3000/api/products/${market_id}`);

export const getProduct = async (product, market_id) =>
  await axios.get(`http://localhost:3000/api/products/${market_id}/${product}`);

export const sendSale = async (elements, market, seller) =>
  await axios.post(`http://localhost:3000/api/sales/${market}/${seller}`, elements);


const authAxios = (token) => axios.create({
  baseURL: `http://localhost:3000/api`,
  headers: {
    Authorization:`Bearer ${token}`
  }
})

export const prueba = async (market_id, token) => 
  await authAxios(token).get(`/products/${market_id}`)

