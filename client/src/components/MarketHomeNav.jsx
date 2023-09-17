import { NavLink, useNavigate } from "react-router-dom"

export default function MarketHomeNav({closeSession, account}) {

    const navigate = useNavigate()

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiaty px-3">
        <h2 className="logo" onClick={()=> navigate('/market')}>{account.market}</h2>
        <div className="container-fluid">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          <li className="nav-item">
            <NavLink className="nav-link" to={`sellers`}>sellers</NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to={`reports`}>reports</NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to={`products`}>products</NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to={`categories`}>categories</NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to={`administrators`}>administrators</NavLink>
          </li>
        </ul>
        <button onClick={closeSession} type="button" className="btn btn-primary btn-sm">Logout</button>
        </div>
      </nav>
  )
}
