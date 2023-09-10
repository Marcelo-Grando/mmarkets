import { useContext, useEffect, useState } from "react";
import { Link, useParams, useNavigate, Outlet } from "react-router-dom";
import { getMarket } from "../api/Market";

import UserContext from "../context/UserContext";

import { logout } from "../api/Signin";
import SessionNotFound from "./SessionNotFound";

export default function MarketHomePage() {
  const [account, setAccount] = useState({});

  const { market } = useParams();

  const {user, setUser} = useContext(UserContext)

  console.log('user context desde market',user)

  // const loadMarket = async () => {
  //   const response = await getMarket(market);
  //   console.log("response del load market: ", response.data.market);
  //   setAccount(response.data);
  // };

  // useEffect(() => {
  //   loadMarket();
  // }, []);

  const navigate = useNavigate();

  const closeSession = async () => {
    const response = await logout();
    setUser(null)
    navigate("/", { replace: true });
  };
 

  return (
    user ?  <main>
    <nav>
      <h2>{user.market}</h2>
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
