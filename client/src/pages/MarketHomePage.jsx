import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { getMarket } from "../api/Market"

export default function MarketHomePage() {

  const [account, setAccount] = useState({})

 const {market} = useParams()

  // const loadMarket = async () => {
  //   const response = await getMarket(market)
  //   setAccount(response.data)
  // }

  // console.log(account)

  // const u = toString

  // useEffect(()=> {
  //   loadMarket()
  // }, [])

  return (
    <div>
        <nav>
            <h2>Market</h2>
            <ul>
                <li><Link to={`/sellers-page/${market}`}>sellers</Link></li>
                <li><Link to={`/reports-page/${market}`}>reports</Link></li>
                <li><Link to={`/products-page/${market}`}>products</Link></li>
                <li><Link to={`/categories-page/${market}`}>categories</Link></li>
                <li><Link to={`/administrators-page/${market}`}>administrators</Link></li>
            </ul>
            </nav>
    </div>
  )
}
