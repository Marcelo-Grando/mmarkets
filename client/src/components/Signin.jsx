import { useState } from "react";
import { Navigate } from "react-router-dom";
import { signinSeller, getSellerByEmail } from "../api/SigninSeller";

export default function SigninSeller() {
  const [member, setMember] = useState({
    email: "",
    password: "",
  });
  const [param, setParam] = useState("");

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

    console.log(response)

    const user = response.data

    //combiar response solo traer id y la position del user y hacer una consulta desde aca para redireccionar

    if (user.position === 'seller') {
      setParam(`/${user.name.concat(user.lastname).replace(/ /g, "")}/${user.market}/${
        user.seller_id
      }`)  
      setMember({
        ...member,
        auth: user.auth
      })
    }

    if (user.position === 'administrator') {
      setParam(`admin/${user.name.concat(user.lastname).replace(/ /g, "")}/${user.market}/`)  
      setMember({
        ...member,
        auth: user.auth
      })
    }

    if (user.position === 'main-account') {
      setParam(`/${user.market.replace(/ /g, "")}/${user.market_id}`)  
      setMember({
        ...member,
        auth: user.auth
      })
    }
  };

  return (
    <>
      <h3>Seller Login</h3>
      <form action="" onSubmit={handleSubmit}>
        <input name="email" type="email" onChange={handleInputsChange} />
        <input name="password" type="password" onChange={handleInputsChange} />
        <button>signin</button>
      </form>
      {member.auth ? (
        <Navigate
          to={param}
          replace={false}
        />
      ) : (
        console.log("no login")
      )}
    </>
  );
}
