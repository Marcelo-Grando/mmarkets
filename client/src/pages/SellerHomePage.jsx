import { useParams, useNavigate } from "react-router-dom"
import Sale from "../components/Sale"
import { logout } from "../api/SigninSeller"
import { useHistory } from "react-router-dom";

export default function SellerHomePage() {

  const {market, seller_id} = useParams()

  

  const historyObj = useHistory();
 
    


  const navigate = useNavigate()

  const closeSession = async () => {
    const response = await logout()
    console.log(('close session', response))
    //navigate('/', {replace: true, })
    historyObj.push("/");
  }
  
  return (
    <div>
        <h1>MarketName</h1>
        <h2>Seller Name</h2>
        <ul>
            <li>Profile</li>
            <li>Sales</li>
            <li>Help</li>
        </ul>
        <button onClick={closeSession}>logout</button>
        <Sale/> 
    </div>
  )
}
