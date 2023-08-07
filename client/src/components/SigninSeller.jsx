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

    const user = response.data

    console.log('USER: ', user)

    if (user.position === 'seller') {
      console.log('position seller')
      setParam(`/${user.name.concat(user.lastname).replace(/ /g, "")}/${user.market}/${
        user.seller_id
      }`)  
      setMember({
        ...member,
        auth: user.auth
      })
    }

    if (user.position === 'main-account') {
      console.log('position market')
      setParam(`/${user.market.replace(/ /g, "")}/${user.market_id}`)  
      setMember({
        ...member,
        auth: user.auth
      })
    }

    // const foundSeller = await getSellerByEmail(seller.email);

    // setMarketParam(foundSeller.data.market);

    // const auth = response.data;

    // setSeller({
    //   ...seller,
    //   ...auth,
    // });
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
