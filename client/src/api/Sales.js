import axios from "axios";

export const getProducts = async () =>
  await axios.get(`http://localhost:3000/api/products/1`);

export const getProduct = async (product) =>
  await axios.get(`http://localhost:3000/api/products/1/${product}`);

export const sendSale = async (elements, market, seller) =>
  await axios.post(`http://localhost:3000/api/sales/${market}/${seller}`, elements);
