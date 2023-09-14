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
    <main className="background-color: #eee">
      <nav className="navbar navbar-expand-lg bg-body-tertiaty px-2">
        <h2>{account.market}</h2>
        <div className="container-fluid">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          <li className="nav-item">
            <Link className="nav-link" to={`sellers`}>sellers</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to={`reports`}>reports</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to={`products`}>products</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to={`categories`}>categories</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to={`administrators`}>administrators</Link>
          </li>
        </ul>
        </div>
        <button onClick={closeSession} type="button" class="btn btn-primary btn-sm">Logout</button>
      </nav>
      <section>
        <Outlet />
      </section>
    </main>
  ) : (
    <SessionNotFound />
  );
}
