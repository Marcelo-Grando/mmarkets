import { useEffect, useState } from "react";
import {useNavigate, Outlet } from "react-router-dom";

import MarketHomeNav from "../components/MarketHomeNav";

import { getMarket } from "../api/Market";

import { logout } from "../api/Signin";
import SessionNotFound from "./SessionNotFound";

export default function MarketHomePage() {
  const [account, setAccount] = useState({});

  const loadMarket = async () => {
    if (localStorage.userData) {
      const { market_id } = JSON.parse(localStorage.getItem("userData"));
      const response = await getMarket(market_id);
      setAccount(response.data);
    }
  };

  useEffect(() => {
    loadMarket();
  }, []);

  const navigate = useNavigate();

  const closeSession = async () => {
    const response = await logout();
    localStorage.removeItem('userData')
    setAccount(null);
    navigate("/", { replace: true });
  };

  return account && account.position === 'main-account' ? (
    <main className="background-color: #eee">
      <MarketHomeNav closeSession={closeSession} account={account} /> 
      <section>
        <Outlet />
      </section>
    </main>
  ) : (
    <SessionNotFound />
  );
}
