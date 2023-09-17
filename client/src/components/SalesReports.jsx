import ReportsCategoryCard from "./ReportsCategoryCard";
import ReportsProductCard from "./ReportsProductCard";
import ReportsDayCard from "./ReportsDayCard";
import {
  getSalesCategories,
  getSalesProducts,
  getSalesSellers,
  getSalesTotal,
  getSalesByDay,
  getSalesByMonth,
  getSalesByYear,
} from "../api/Reports";

import { useState, useEffect } from "react";

export default function SalesReports() {
  const [salesTotal, setSalesTotal] = useState({});
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [sellers, setSellers] = useState([]);
  const [salesDay, setSalesDay] = useState([]);

  const { market_id } = JSON.parse(localStorage.getItem("userData"));

  async function loadSalesTotal() {
    const response = await getSalesTotal(market_id);
    setSalesTotal(response.data);
  }

  async function loadSalesCategories() {
    const response = await getSalesCategories(market_id);
    setCategories(response.data);
  }

  async function loadSalesProducts() {
    const response = await getSalesProducts(market_id);
    setProducts(response.data);
  }

  async function loadSalesSellers() {
    const response = await getSalesSellers(market_id);
    setSellers(response.data);
  }

  async function loadSalesByDay() {
    const response = await getSalesByDay(market_id);
    setSalesDay(response.data);
  }

  async function loadSalesByMonth() {
    const response = await getSalesByMonth(market_id);
  }

  async function loadSalesByYear() {
    const response = await getSalesByYear(market_id);
  }

  useEffect(() => {
    loadSalesTotal();
    loadSalesCategories();
    loadSalesProducts();
    loadSalesSellers();
    loadSalesByDay();
    loadSalesByMonth();
    loadSalesByYear();
  }, []);

  return (
    <div>
      <div className="container-fluid text-center p-0">
        <div className="row">
          <h3>sales by categories</h3>
          {categories.map((c) => (
            <ReportsCategoryCard key={c.category_id} category={c} />
          ))}
        </div>
      </div>
      <div className="container-fluid text-center p-0">
        <div className="row">
          <h3>sales by products</h3>
          {products.map((p, index) => (
            <ReportsProductCard key={index} product={p} />
          ))}
        </div>
      </div>
      <div className="container-fluid text-center p-0">
        <div className="row">
          <h3>sales by days</h3>
          {salesDay.map((p, index) => (
            <ReportsDayCard key={index} day={p}/>
          ))}
        </div>
      </div>
    </div>
  );
}
