import { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { getMarket } from "../api/Market";

import { logout } from "../api/Signin";
import SessionNotFound from "./SessionNotFound";

export default function MarketHomePage() {
  const [account, setAccount] = useState({});

  const { market } = useParams();

  const loadMarket = async () => {
    const response = await getMarket(market);
    console.log("response del load market: ", response.data.market);
    setAccount(response.data);
  };

  console.log(account)

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
    (account.market) ?  <div>
    <nav>
      <h2>{account.market}</h2>
      <ul>
        <li>
          <Link to={`/sellers-page/${market}`}>sellers</Link>
        </li>
        <li>
          <Link to={`/reports-page/${market}`}>reports</Link>
        </li>
        <li>
          <Link to={`/products-page/${market}`}>products</Link>
        </li>
        <li>
          <Link to={`/categories-page/${market}`}>categories</Link>
        </li>
        <li>
          <Link to={`/administrators-page/${market}`}>administrators</Link>
        </li>
      </ul>
    </nav>
    <button onClick={closeSession}>Logout</button>
  </div>: <SessionNotFound/>
  )
}
