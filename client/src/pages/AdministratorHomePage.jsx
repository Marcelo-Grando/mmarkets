import { Link, Outlet } from "react-router-dom";
import SessionNotFound from "./SessionNotFound";

import { useAccount } from "../hooks/useAccount";

export default function AdministratorHomePage() {
  const {account, closeSession} = useAccount()

  console.log('acc',account)

  if(account) {
    return account.position === 'administrator' ? (
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
  return <SessionNotFound/>
}
