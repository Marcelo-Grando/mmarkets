import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { getMarket } from "../api/Market"

export default function MarketHomePage() {

  const [account, setAccount] = useState({})

 const {market} = useParams()

 const loadMarket = async () => {
  const response = await getMarket(market)
  setAccount(response.data)
 }

 useEffect(()=> {
  loadMarket()
 }, [])

  return (
    <div>
        <nav>
            <h2>{account.market}</h2>
            <ul>
                <li><Link to={`/sellers-page/${market}`}>sellers</Link></li>
                <li><Link to={`/reports-page/${market}`}>reports</Link></li>
                <li><Link to={`/products-page/${market}`}>products</Link></li>
                <li><Link to={`/categories-page/${market}`}>categories</Link></li>
            </ul>
            </nav>
    </div>
  )
}
