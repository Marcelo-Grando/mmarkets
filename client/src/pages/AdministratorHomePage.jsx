import { Link, useParams, useNavigate } from "react-router-dom";
import { getAdministrator } from "../api/Administrators";
import { useState, useEffect } from "react";
import { logout } from "../api/Signin";
import SessionNotFound from "./SessionNotFound";

export default function AdministratorHomePage() {

  const { market, administrador_id } = useParams();

  const [account, setAccount] = useState({})

  console.log(market, administrador_id)

  const loadAdministrator = async () => {
    const response = await getAdministrator(market, administrador_id);
    console.log("response del load market: ", response.data);
    setAccount(response.data);
  };



  useEffect(() => {
    loadAdministrator();
  }, []);

  console.log(account)

  const navigate = useNavigate();

  const closeSession = async () => {
    const response = await logout();
    console.log(("close session", response));
    navigate("/", { replace: true });
  };

  

  return (
    (account.name) ? <div>
    <h1>Market Name</h1>
    <h2>{account.name}</h2>
    <ul>
      <li>
        <Link to={`/reports-page/${market}`}>Reports</Link>
      </li>
      <li>
        <Link>Sales</Link>
      </li>
      <button onClick={closeSession}>Logout</button>
    </ul>
  </div> : <SessionNotFound/>
  );
}
