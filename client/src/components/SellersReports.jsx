import { useState, useEffect } from "react";
import { useAccount } from "../hooks/useAccount";

import { getSalesSellers } from "../api/Reports";

import ReportsSellerCard from "./ReportsSellerCard";

export default function SellersReports() {
  const [sellers, setSellers] = useState([]);

  const { market_id } = JSON.parse(localStorage.getItem("user"));

  async function loadSalesSellers() {
    const response = await getSalesSellers(market_id);
    setSellers(response.data);
  }

  useEffect(() => {
    loadSalesSellers();
  }, []);

  return (
    <div>
      {sellers.map((seller, index) => (
        <div key={index}>
          <h3>{`${seller.name} ${seller.lastname}`} </h3>
          <h4>{`Total Sold: $${seller.total_sold}`}</h4>
        </div>
      ))}
    </div>
  );
}
