import axios from "axios";

export const getProducts = async (market) =>
  await axios.get(`http://localhost:3000/api/products/${market}`);

export const findProduct = async (product, market) =>
  await axios.get(`http://localhost:3000/api/products/${market}/${product}`);

export const sendProduct = async (product, market) =>
  await axios.post(`http://localhost:3000/api/products/${market}`, product);

export const deleteProduct = async (product_id, market) =>
  await axios.delete(`http://localhost:3000/api/products/${market}/${product_id}`);
