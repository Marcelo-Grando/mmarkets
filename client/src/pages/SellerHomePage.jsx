import Sale from "../components/Sale";
import SessionNotFound from "./SessionNotFound";
import SellerHomeNav from "../components/SellerHomeNav";

import { useAccount } from "../hooks/useAccount";

export default function SellerHomePage() {
  const {account, closeSession} = useAccount()

  console.log('acc: ',account)

  if(account) {
    localStorage.setItem('user', JSON.stringify(account))
  }


    return account ? (
      <main>
        <SellerHomeNav closeSession={closeSession}/>
        <Sale />
      </main>
    ) : (
      <SessionNotFound />
    );
}
