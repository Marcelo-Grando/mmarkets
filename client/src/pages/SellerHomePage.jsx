import { useParams, useNavigate } from "react-router-dom"
import Sale from "../components/Sale"
import { getSeller } from "../api/Sellers"
import { logout } from "../api/Signin"
import { useState, useEffect, useContext } from "react"
import SessionNotFound from "./SessionNotFound"
import UserContext from "../context/UserContext"

export default function SellerHomePage() {

  const [account, setAccount] = useState(null)

  const {market, seller_id} = useParams()

  const {user, setUser} = useContext(UserContext)

  // const loadSeller = async () => {
  //   const response = await getSeller(market, seller_id);
  //   setAccount(response.data);
  // };

  // useEffect(() => {
  //   loadSeller();
  // }, []);

  useEffect(() => {
    localStorage.setItem('user', JSON.stringify(user))
    console.log('local: ', JSON.parse(localStorage.getItem('user')))
  }, [])

  

  const navigate = useNavigate()

  const closeSession = async () => {
    const response = await logout()
    await setUser(null)
    navigate('/', {replace: true, })
  }
  
  return (
    user ? <div>
    <h1>MarketName</h1>
    <h2>{user.name}</h2>
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
