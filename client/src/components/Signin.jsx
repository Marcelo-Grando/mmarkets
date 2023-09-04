import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signinSeller} from "../api/Signin";

export default function SigninSeller() {
  const [member, setMember] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate() 

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

    if (user.position === 'seller') 
      navigate(`/${user.name.concat(user.lastname).replace(/ /g, "")}/${user.market}/${
        user.seller_id
      }`)  
    

    if (user.position === 'administrator') 
    navigate(`admin/${user.name.concat(user.lastname).replace(/ /g, "")}/${user.market}/`)  
    

    if (user.position === 'main-account') 
      navigate(`/${user.market.replace(/ /g, "")}/${user.market_id}`)  
    
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
