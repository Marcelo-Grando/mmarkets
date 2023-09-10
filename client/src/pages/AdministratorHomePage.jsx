import { Link, useParams, useNavigate, Outlet } from "react-router-dom";
import { getAdministrator } from "../api/Administrators";
import { useState, useEffect, useContext } from "react";
import { logout } from "../api/Signin";
import SessionNotFound from "./SessionNotFound";

import UserContext from "../context/UserContext";

export default function AdministratorHomePage() {

  const { market, administrador_id } = useParams();

  const [account, setAccount] = useState({})

  const {user, setUser} = useContext(UserContext)

  console.log('user context desde admin: ',user)

  // const loadAdministrator = async () => {
  //   const response = await getAdministrator(market, administrador_id);
  //   console.log("response del load market: ", response.data);
  //   setAccount(response.data);
  // };

  // useEffect(() => {
  //   loadAdministrator();
  // }, []);

  const navigate = useNavigate();

  const closeSession = async () => {
    const response = await logout();
    setUser(null)
    navigate("/", { replace: true });
  };

  return (
    user ? <main>
    <h1>Market Name</h1>
    <h2>{user.name}</h2>
    <ul>
      <li>
        <Link to={`reports/${user.market}`}>Reports</Link>
      </li>
      <li>
        <Link>Sales</Link>
      </li>
      <button onClick={closeSession}>Logout</button>
    </ul>
    <section>
      <Outlet/>
    </section>
  </main> : <SessionNotFound/>
  );
}
