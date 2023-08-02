import React, { useEffect } from "react";

export default function HomePage() {
  useEffect(() => {
    console.log("hola");
  });

  return (
    <div>
      <div>
        <h1>Mmarkets</h1>
      </div>
      <div>
        <h3>Create Acount</h3>
        <form action="">
          <input type="text" name="market" placeholder="market name" />
          <input type="text" name="adress" placeholder="adress" />
          <input type="email" name="email" placeholder="email" />
          <input type="password" name="email" placeholder="password" />
          <button>create acount</button>
        </form>
        <h3>Login</h3>
        <form action="">
          <input type="email" placeholder="email" />
          <input type="password" placeholder="password" />
          <button>login</button>
        </form>
      </div>
    </div>
  );
}
