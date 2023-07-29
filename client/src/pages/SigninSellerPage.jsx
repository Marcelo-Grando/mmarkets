import { useState } from "react";
import { Navigate } from "react-router-dom";
import { signinSeller } from "../api/SigninSeller";

export default function SigninSellerPage() {

  const [seller, setSeller] = useState({
    email: "",
    password: ""
  });

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

    response?console.log('Response: ',response):console.log('first')
   
    const auth = response.data

    
    
    setSeller({
      ...seller,
      ...auth
    })
  }

  return (
    <>
      <h3>Login</h3>
      <form action="" onSubmit={handleSubmit}>
        <input name="email" type="email" onChange={handleInputsChange}/>
        <input name="password" type="password" onChange={handleInputsChange}/>
        <button>signin</button>
      </form>
      {
        seller.auth? <Navigate to={`/sale-page/${seller.market}/${seller.seller_id}`} replace={true} />:console.log('no auth')
      }
    </>
  );
}
