import Sale from "../components/Sale";
import SessionNotFound from "./SessionNotFound";
import SellerHomeNav from "../components/SellerHomeNav";

import { useAccount } from "../hooks/useAccount";

export default function SellerHomePage() {
  const {account, closeSession} = useAccount()

  if(account) {
    return (account.position === 'seller') ? (
      <main>
        <SellerHomeNav closeSession={closeSession}/>
        <Sale />
      </main>
    ) : (
      <SessionNotFound />
    );
  }
  return <SessionNotFound/>
}
