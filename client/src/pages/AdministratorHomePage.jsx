import { Link, useNavigate, Outlet } from "react-router-dom";
import { getAdministrator } from "../api/Administrators";
import { useState, useEffect } from "react";
import { logout } from "../api/Signin";
import SessionNotFound from "./SessionNotFound";

export default function AdministratorHomePage() {
  const [account, setAccount] = useState({});

  const loadAdministrator = async () => {
    if (localStorage.userData) {
      const { market_id, id } = JSON.parse(localStorage.getItem("userData"));
      const response = await getAdministrator(market_id, id);
      console.log("response del load market: ", response.data);
      setAccount(response.data);
    }
  };

  useEffect(() => {
    loadAdministrator();
  }, []);

  const navigate = useNavigate();

  const closeSession = async () => {
    const response = await logout();
    setAccount(null);
    localStorage.removeItem("userData");
    navigate("/", { replace: true });
  };

  return account ? (
    <main>
      <h1>Market Name</h1>
      <h2>{account.name}</h2>
      <ul>
        <li>
          <Link to={`reports`}>Reports</Link>
        </li>
        <li>
          <Link>Sales</Link>
        </li>
        <button onClick={closeSession}>Logout</button>
      </ul>
      <section>
        <Outlet />
      </section>
    </main>
  ) : (
    <SessionNotFound />
  );
}
