import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

import UserContext from "../context/UserContext";

import { signinSeller } from "../api/Signin";

export default function SigninSeller() {
  const [member, setMember] = useState({
    email: "",
    password: "",
  });

  const { user, setUser } = useContext(UserContext);

  const navigate = useNavigate();

  const handleInputsChange = (e) => {
    const { name, value } = e.target;
    setMember({
      ...member,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await signinSeller(member);
    const { position, name, lastname, market, id } = response.data;
    setUser(response.data);

    console.log(response.data);

    localStorage.setItem("userData", JSON.stringify(response.data));

    if (position === "seller") navigate(`/seller`);

    if (position === "administrator") navigate(`/administrator`);

    if (position === "main-account") navigate(`/market`);
  };

  return (
    <>
      <div className="p-2">
        <div className="abs-center text-center">
          <form className="border p-3 form" action="" onSubmit={handleSubmit}>
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
    </>
  );
}
