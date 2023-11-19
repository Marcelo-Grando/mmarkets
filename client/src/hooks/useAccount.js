import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { getUserData } from "../api/Market";
import { logout } from "../api/Signin";

// {
//   "adress": "nos ee 123",
//   "email": "nose@gmail.com",
//   "market_id": 3,
//   "name": "pruaba",
//   "position": "main-account",
//   "state": 1
// }

export const useAccount = () => {
  const [account, setAccount] = useState(null);

  const navigate = useNavigate();

  const uploadUserInfo = async () => {
    if (!localStorage.getItem("userData")) await getUserData();

    const { user_id, roles } = JSON.parse(
      localStorage.getItem("userData")
    );

    const response = await getUserData(user_id, roles);

    console.log(response);

    setAccount(response.data);
  };

  useEffect(() => {
    uploadUserInfo();
  }, []);

  const closeSession = async () => {
    const response = await logout();
    localStorage.removeItem("userData");
    localStorage.removeItem("user");
    setAccount(null);
    navigate("/", { replace: true });
  };

  return { account, closeSession };
};
