import { NavLink } from "react-router-dom"

export default function SellersNav() {
  return (
    <nav className="container-fluid border border-dark text-center">
          <div className="row p-0">
            <div className="col btn-gr">
              <NavLink to={'manege-sellers'} className="nav-link">manage seller</NavLink>
            </div>
            <div className="col btn-gr">
              <NavLink className="nav-link">statistics sellers</NavLink>
            </div>
            <div className="col btn-gr">
              <NavLink className="nav-link">sellers info</NavLink>
            </div>
            <div className="col btn-gr">
              <NavLink className="nav-link">resume</NavLink>
            </div>
            <div className="col btn-gr">
              <NavLink className="nav-link">payments</NavLink>
            </div>
          </div>
    </nav>
  )
}
