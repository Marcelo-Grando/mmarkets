import { NavLink } from "react-router-dom"

export default function AdministratorNav() {
  return (
    <nav className="container-fluid border border-dark text-center">
          <div className="row">
            <div className="col btn-gr">
              <NavLink to={'manege-sellers'} className="nav-link">manage administrators</NavLink>
            </div>
            <div className="col btn-gr">
              <NavLink className="nav-link">administrator reports</NavLink>
            </div>
          </div>
    </nav>
  )
}
