import { Link, useParams } from "react-router-dom"

export default function MarketHomePage() {

 const {market} = useParams()

  return (
    <div>
        <nav>
            <h2>MarketName</h2>
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
