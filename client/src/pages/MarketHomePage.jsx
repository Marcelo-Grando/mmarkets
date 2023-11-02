import { Outlet } from "react-router-dom";

import MarketHomeNav from "../components/MarketHomeNav";
import SessionNotFound from "./SessionNotFound";

import { useAccount } from "../hooks/useAccount";


export default function MarketHomePage() {
  const {account, closeSession} = useAccount()

  console.log(account)

    return account? (
      <main className="background-color: #eee">
        <MarketHomeNav closeSession={closeSession} account={account} /> 
        <section>
          <Outlet />
        </section>
      </main>
    ) : (
      <SessionNotFound />
    );
}
