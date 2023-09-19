import { useNavigate } from "react-router-dom";
import Sale from "../components/Sale";
import { getSeller } from "../api/Sellers";
import { logout } from "../api/Signin";
import { useState, useEffect } from "react";
import SessionNotFound from "./SessionNotFound";
import SellerHomeNav from "../components/SellerHomeNav";

export default function SellerHomePage() {
  const [account, setAccount] = useState(null);

  const loadSeller = async () => {
    if (localStorage.userData) {
      const { market_id, id } = JSON.parse(localStorage.getItem("userData"));
      const response = await getSeller(market_id, id);
      setAccount(response.data);
      console.log(response.data);
    }
  };

  useEffect(() => {
    loadSeller();
  }, []);

  const navigate = useNavigate();

  const closeSession = async () => {
    const response = await logout();
    setAccount(null);
    localStorage.removeItem("userData");
    navigate("/", { replace: true });
  };

  console.log(account)

  return account ? (
    <main>
      <SellerHomeNav closeSession={closeSession}/>
      <Sale />
    </main>
  ) : (
    <SessionNotFound />
  );
}
