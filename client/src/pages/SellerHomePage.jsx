import { useParams } from "react-router-dom"
import Sale from "../components/Sale"

export default function SellerHomePage() {

  const {market, seller_id} = useParams()
  
  return (
    <div>
        <h1>MarketName</h1>
        <h2>Seller Name</h2>
        <ul>
            <li>Profile</li>
            <li>Sales</li>
            <li>Help</li>
        </ul>
        <Sale/>
    </div>
  )
}
