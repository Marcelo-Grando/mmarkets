import axios from "axios";

export const getSalesTotal = () => 
    axios.get(`http://localhost:3000/reports/sales_total/1`)

    export const getSalesCategories = () => 
    axios.get(`http://localhost:3000/reports/sales_categories/1`)

    export const getSalesProducts = () => 
    axios.get(`http://localhost:3000/reports/sales_products/1`)

    export const getSalesSellers = () => 
    axios.get(`http://localhost:3000/reports/sales_sellers/1`)

    export const getSalesByDay = () => 
    axios.get(`http://localhost:3000/reports/sales_by_day/1`)

    export const getSalesByMonth = () => 
    axios.get(`http://localhost:3000/reports/sales_by_month/1`)

    export const getSalesByYear = () => 
    axios.get(`http://localhost:3000/reports/sales_by_year/1`)