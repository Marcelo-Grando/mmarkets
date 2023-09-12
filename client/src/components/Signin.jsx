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

    localStorage.setItem('userData', JSON.stringify(response.data))

    if (position === "seller")
      navigate(`/seller`);

    if (position === "administrator")
      navigate(
        `admin/${name.concat(lastname).replace(/ /g, "")}/${market}/${id}`
      );

    if (position === "main-account")
      navigate(`/${market.replace(/ /g, "")}/${id}`);
  };


  return (
    <>
      <h3>Login</h3>
      <form action="" onSubmit={handleSubmit}>
        <input name="email" type="email" onChange={handleInputsChange} />
        <input name="password" type="password" onChange={handleInputsChange} />
        <button>signin</button>
      </form>
    </>
  );
}
