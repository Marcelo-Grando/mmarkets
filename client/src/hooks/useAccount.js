import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { getMarket } from "../api/Market";
import { getSeller } from "../api/Sellers";
import { getAdministrator } from "../api/Administrators";
import { logout } from "../api/Signin";

export const useAccount = () => {
  const [account, setAccount] = useState(null);

  const navigate = useNavigate();

  const loadUser = async () => {
    if (localStorage.userData) {
      const { id, position, market_id } = JSON.parse(
        localStorage.getItem("userData")
      );
      if (position === "main-account") {
        const response = await getMarket(id);
        setAccount(response.data);
      }
      if (position === "seller") {
        const response = await getSeller(market_id, id);
        setAccount(response.data);
      }
      if (position === "administrator") {
        const response = await getAdministrator(market_id, id);
        setAccount(response.data);
      }
    }
  }

    useEffect(() => {
      loadUser();
    }, []);
 

  const closeSession = async () => {
    const response = await logout();
    localStorage.removeItem("userData");
    setAccount(null);
    navigate("/", { replace: true });
  };

  return { account, closeSession };
};
