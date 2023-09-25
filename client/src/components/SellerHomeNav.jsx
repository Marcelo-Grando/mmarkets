import { NavLink } from "react-router-dom";

export default function SellerHomeNav({ closeSession }) {
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiaty px-2 mx-2 py-0">
      <h3 className="logo my-1">Market</h3>
      <div className="container-fluid mx-3">
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          <li className="nav-item">
            <NavLink className="nav-link">sell</NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link">sales</NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link">products</NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link">categories</NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link">summary</NavLink>
          </li>
        </ul>
        <button
          onClick={closeSession}
          type="button"
          className="btn btn-primary btn-sm"
        >
          Logout
        </button>
      </div>
    </nav>
  );
}
