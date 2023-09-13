import { useEffect, useState } from "react";
import {
  getSalesTotal,
  getSalesCategories,
  getSalesProducts,
  getSalesSellers,
  getSalesByDay,
  getSalesByMonth,
  getSalesByYear,
} from "../api/Reports";
import ReportsCategoryCard from "../components/ReportsCategoryCard";
import ReportsProductCard from "../components/ReportsProductCard";
import ReportsSellerCard from "../components/ReportsSellerCard";
import ReportsDayCard from "../components/ReportsDayCard";

export default function ReportsPage() {
  const [salesTotal, setSalesTotal] = useState({});
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [sellers, setSellers] = useState([]);
  const [salesDay, setSalesDay] = useState([])

  const {market_id} = JSON.parse(localStorage.getItem('userData'))

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
    setSalesDay(response.data)
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
    <>
      <div>
        <h3>Accumulated Sales</h3>
        <h4>Total: $ {salesTotal.total_sales}</h4>
      </div>
      <div>
        <h3>Sales By Categories</h3>
        {categories.map((c) => (
          <ReportsCategoryCard key={c.category_id} category={c} />
        ))}
      </div>
      <div>
        <h3>Sales By Products</h3>
        {products.map((p) => (
          <ReportsProductCard key={p.product_id} product={p} />
        ))}
      </div>
      <div>
        <h3>Sales By Sellers</h3>
        {sellers.map((s) => (
          <ReportsSellerCard key={s.seller} seller={s} />
        ))}
      </div>
      <div>
        <h3>Sales By Day</h3>
        {
            salesDay.map((d, i) => <ReportsDayCard key={i} day={d}/>)
        }
      </div>
    </>
  );
}
