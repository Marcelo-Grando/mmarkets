import axios from "axios";

export const getSalesTotal = () =>
  axios.get(`http://localhost:3000/api/sales-total/1`);

export const getSalesCategories = () =>
  axios.get(`http://localhost:3000/api/sales-categories/1`);

export const getSalesProducts = () =>
  axios.get(`http://localhost:3000/api/sales-products/1`);

export const getSalesSellers = () =>
  axios.get(`http://localhost:3000/api/sales-sellers/1`);

export const getSalesByDay = () =>
  axios.get(`http://localhost:3000/api/sales-by-day/1`);

export const getSalesByMonth = () =>
  axios.get(`http://localhost:3000/api/sales-by-month/1`);

export const getSalesByYear = () =>
  axios.get(`http://localhost:3000/api/sales-by-year/1`);
