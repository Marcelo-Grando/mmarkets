import { useEffect, useState } from "react";
import { Link, useParams, useNavigate, Outlet } from "react-router-dom";
import { getMarket } from "../api/Market";

import { logout } from "../api/Signin";
import SessionNotFound from "./SessionNotFound";

export default function MarketHomePage() {
  const [account, setAccount] = useState({});

  const { market } = useParams();
  const params = useParams()

  const loadMarket = async () => {
    const response = await getMarket(market);
    console.log("response del load market: ", response.data.market);
    setAccount(response.data);
  };

  console.log(account)
  console.log('params: ',params)

  useEffect(() => {
    loadMarket();
  }, []);

  const navigate = useNavigate();

  const closeSession = async () => {
    const response = await logout();
    console.log(("close session", response));
    navigate("/", { replace: true });
  };
 

  return (
    (account.market) ?  <main>
    <nav>
      <h2>{account.market}</h2>
      <ul>
        <li>
          <Link to={`sellers/${market}`}>sellers</Link>
        </li>
        <li>
          <Link to={`reports/${market}`}>reports</Link>
        </li>
        <li>
          <Link to={`products/${market}`}>products</Link>
        </li>
        <li>
          <Link to={`categories/${market}`}>categories</Link>
        </li>
        <li>
          <Link to={`administrators/${market}`}>administrators</Link>
        </li>
      </ul>
      <button onClick={closeSession}>Logout</button>
    </nav>
    <section>
      <Outlet/>
    </section>
  </main>: <SessionNotFound/>
  )
}
