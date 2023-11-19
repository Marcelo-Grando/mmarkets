import { Link, Outlet } from "react-router-dom";
import SessionNotFound from "./SessionNotFound";

import { useAccount } from "../hooks/useAccount";

export default function AdministratorHomePage() {
  const { account, closeSession } = useAccount();

  if (account) {
    localStorage.setItem("user", JSON.stringify(account));
  }

  return account ? (
    <main>
      <h1>{"Mmarket'S"}</h1>
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
