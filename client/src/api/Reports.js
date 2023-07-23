import axios from "axios";

export const getSalesTotal = (market) =>
  axios.get(`http://localhost:3000/api/sales-total/${market}`);

export const getSalesCategories = (market) =>
  axios.get(`http://localhost:3000/api/sales-categories/${market}`);

export const getSalesProducts = (market) =>
  axios.get(`http://localhost:3000/api/sales-products/${market}`);

export const getSalesSellers = (market) =>
  axios.get(`http://localhost:3000/api/sales-sellers/${market}`);

export const getSalesByDay = (market) =>
  axios.get(`http://localhost:3000/api/sales-by-day/${market}`);

export const getSalesByMonth = (market) =>
  axios.get(`http://localhost:3000/api/sales-by-month/${market}`);

export const getSalesByYear = (market) =>
  axios.get(`http://localhost:3000/api/sales-by-year/${market}`);
