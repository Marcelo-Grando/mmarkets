import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { signin } from "../api/Signin";

export default function SigninSeller() {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleInputsChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const userSubmit = async (e) => {
    e.preventDefault();

    const response = await signin(user);
    const { position } = response.data;

    localStorage.setItem("userData", JSON.stringify(response.data));

    if (position === "seller") navigate(`/seller`);

    if (position === "administrator") navigate(`/administrator`);

    if (position === "main-account") navigate(`/market`);
  };

  return (
    <div className="p-2">
      <div className="abs-center text-center">
        <form className="border p-3 form" action="" onSubmit={userSubmit}>
          <h4 className="align-middle p-2">Login</h4>
          <div className="form-group p-2">
            <input
              autoFocus
              className="form-control"
              name="email"
              type="email"
              onChange={handleInputsChange}
              placeholder="email"
            />
          </div>
          <div className="form-group p-2">
            <input
              className="form-control"
              name="password"
              type="password"
              onChange={handleInputsChange}
              placeholder="password"
            />
          </div>
          <div className="form-group m-2">
            <button className="form-control bg-info">signin</button>
          </div>
        </form>
      </div>
    </div>
  );
}
