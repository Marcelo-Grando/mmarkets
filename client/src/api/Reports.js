import axios from "axios";

export const getSalesTotal = () =>
  axios.get(`http://localhost:3000/reports/sales-total/1`);

export const getSalesCategories = () =>
  axios.get(`http://localhost:3000/reports/sales-categories/1`);

export const getSalesProducts = () =>
  axios.get(`http://localhost:3000/reports/sales-products/1`);

export const getSalesSellers = () =>
  axios.get(`http://localhost:3000/reports/sales-sellers/1`);

export const getSalesByDay = () =>
  axios.get(`http://localhost:3000/reports/sales-by-day/1`);

export const getSalesByMonth = () =>
  axios.get(`http://localhost:3000/reports/sales-by-month/1`);

export const getSalesByYear = () =>
  axios.get(`http://localhost:3000/reports/sales-by-year/1`);
