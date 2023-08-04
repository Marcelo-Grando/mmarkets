import { useState } from "react";
import { Navigate } from "react-router-dom";
import { signinSeller, getSeller } from "../api/SigninSeller";

export default function SigninSeller() {

  const [seller, setSeller] = useState({
    email: "",
    password: ""
  });
  const [marketParam, setMarketParam] = useState('')

  const handleInputsChange = (e) => {
    const { name, value } = e.target;
    setSeller({
      ...seller,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault()
    const response = await signinSeller(seller)

    const foundSeller = await getSeller(seller.email)

    setMarketParam(foundSeller.data.market)
   
    const auth = response.data

    setSeller({
      ...seller,
      ...auth
    })
  }

  return (
    <>
      <h3>Seller Login</h3>
      <form action="" onSubmit={handleSubmit}>
        <input name="email" type="email" onChange={handleInputsChange}/>
        <input name="password" type="password" onChange={handleInputsChange}/>
        <button>signin</button>
      </form>
      {
        seller.auth? <Navigate to={`/${marketParam.replace(/ /g,'')}/${seller.market}/${seller.seller_id}`} replace={false} />: console.log('first')
      }
    </>
  );
}
