import { useParams, useNavigate } from "react-router-dom"
import Sale from "../components/Sale"
import { getSeller } from "../api/Sellers"
import { logout } from "../api/Signin"
import { useState, useEffect, useContext } from "react"
import SessionNotFound from "./SessionNotFound"
import UserContext from "../context/UserContext"

export default function SellerHomePage() {

  const [account, setAccount] = useState(null)

  //const {market, seller_id} = useParams()

  

  const loadSeller = async () => {
    if (localStorage.userData) {
      const {market, id}  = JSON.parse(localStorage.getItem('userData'))
      const response = await getSeller(market, id);
      setAccount(response.data);
      console.log(response.data)
    }
  };

  // useEffect(() => {
  //   loadSeller();
  // }, []);

  useEffect(() => {
    loadSeller()
  }, [])

  

  const navigate = useNavigate()

  const closeSession = async () => {
    const response = await logout()
    setAccount(null)
    localStorage.removeItem('userData')
    navigate('/', {replace: true, })
  }
  
  return (
     account ? <div>
    <h1>Mmarket'S</h1>
    <h2>{account.name}</h2>
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
