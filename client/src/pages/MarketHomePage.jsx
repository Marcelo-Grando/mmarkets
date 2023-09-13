import { useEffect, useState } from "react";
import { Link, useNavigate, Outlet } from "react-router-dom";
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
      console.log(response.data)
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
    <main>
      <nav>
        <h2>{account.market}</h2>
        <ul>
          <li>
            <Link to={`sellers`}>sellers</Link>
          </li>
          <li>
            <Link to={`reports`}>reports</Link>
          </li>
          <li>
            <Link to={`products`}>products</Link>
          </li>
          <li>
            <Link to={`categories`}>categories</Link>
          </li>
          <li>
            <Link to={`administrators`}>administrators</Link>
          </li>
        </ul>
        <button onClick={closeSession}>Logout</button>
      </nav>
      <section>
        <Outlet />
      </section>
    </main>
  ) : (
    <SessionNotFound />
  );
}
