import { useState } from "react";
import { createAccount } from "../api/Home";
import Signin from "../components/Signin";

export default function HomePage() {
  const [account, setAccount] = useState({
    market: "",
    adress: "",
    email: "",
    password: "",
  });

  const handleInputsChange = (e) => {
    const { name, value } = e.target;
    setAccount({
      ...account,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await createAccount(account);
    console.log(response);
    setAccount({
      market: "",
      adress: "",
      email: "",
      password: "",
    });
  };

  //console.log(account)

  return (
    <div>
      <div>
        <h1>Mmarkets</h1>
      </div>
      <div>
        <h3>Create Main Acount</h3>
        <form action="" onSubmit={handleSubmit}>
          <input
            type="text"
            name="market"
            placeholder="market name"
            onChange={handleInputsChange}
            value={account.market}
          />
          <input
            type="text"
            name="adress"
            placeholder="adress"
            onChange={handleInputsChange}
            value={account.adress}
          />
          <input
            type="email"
            name="email"
            placeholder="email"
            onChange={handleInputsChange}
            value={account.email}
          />
          <input
            type="password"
            name="password"
            placeholder="password"
            onChange={handleInputsChange}
            value={account.password}
          />
          <button>create acount</button>
        </form>
      </div>
      <Signin />
    </div>
  );
}
