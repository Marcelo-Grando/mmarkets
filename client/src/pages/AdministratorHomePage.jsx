import { Link, useParams } from "react-router-dom"

export default function AdministratorHomePage() {

    const {market} = useParams()

  return (
    <div>
        <h1>Market Name</h1>
        <h2>User Name</h2>
        <ul>
            <li><Link to={`/reports-page/${market}`}>Reports</Link></li>
            <li><Link>Sales</Link></li>
            <li><Link></Link></li>
        </ul>
    </div>
  )
}
