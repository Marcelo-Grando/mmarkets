import React, { useEffect } from "react";
import SigninSeller from "../components/SigninSeller";
import SignupMarket from "../components/SignupMarket";

export default function HomePage() {
  useEffect(() => {
    console.log("hola");
  });

  return (
    <div>
      <div>
        <h1>Mmarkets</h1>
      </div>
        <SignupMarket/>
        <SigninSeller/>
    </div>
  );
}
