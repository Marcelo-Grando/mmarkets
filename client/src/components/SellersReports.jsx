import { useState, useEffect } from "react";

import { getSalesSellers } from "../api/Reports";

import ReportsSellerCard from "./ReportsSellerCard";

export default function SellersReports() {
    const [sellers, setSellers] = useState([]);

    const {market_id} = JSON.parse(localStorage.getItem('userData'))

    useEffect(() => {
        loadSalesSellers()
      }, []);

    async function loadSalesSellers() {
        const response = await getSalesSellers(market_id);
        setSellers(response.data);
      }

  return (
    <div>
        {
            sellers.map(seller => <ReportsSellerCard key={seller.seller} seller={seller} />)
        }
    </div>
  )
}
