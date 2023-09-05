import { useParams, useNavigate } from "react-router-dom"
import Sale from "../components/Sale"
import { getSeller } from "../api/Sellers"
import { logout } from "../api/Signin"
import { useState, useEffect } from "react"
import SessionNotFound from "./SessionNotFound"

export default function SellerHomePage() {

  const [account, setAccount] = useState({})

  const {market, seller_id} = useParams()

  const loadSeller = async () => {
    const response = await getSeller(market, seller_id);
    console.log("response del load market: ", response.data);
    setAccount(response.data);
  };

  console.log(account)

  useEffect(() => {
    loadSeller();
  }, []);

  const navigate = useNavigate()

  const closeSession = async () => {
    const response = await logout()
    console.log(('close session', response))
    navigate('/', {replace: true, })
  }
  
  return (
    (account.email) ? <div>
    <h1>MarketName</h1>
    <h2>Seller Name</h2>
    <ul>
        <li>Profile</li>
        <li>Sales</li>
        <li>Help</li>
    </ul>
    <button onClick={closeSession}>logout</button>
    <Sale/> 
</div> : <SessionNotFound/>
  )
}
