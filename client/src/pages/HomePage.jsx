import Signin from "../components/Signin";
import { NavLink, useNavigate } from "react-router-dom";

export default function HomePage() {
  const navigate = useNavigate();

  const navLogin = () => {
    localStorage.setItem("type", "signin");
    navigate("/create-account");
  };

  const navRegister = () => {
    localStorage.setItem("type", "register");
    navigate("/create-account");
  };
  return (
    <main>
      <nav className="navbar navbar-expand-lg bg-body-tertiaty px-2">
        <h2 className="logo" onClick={() => navigate("/")}>
          Mmarket'S
        </h2>
        <div className="container-fluid">
          <ul className="navbar-nav justify-content-end">
            <li className="nav-item">
              <NavLink className="nav-link">utilities</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link">tutorials</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link">prices</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link">About</NavLink>
            </li>
          </ul>
          <div>
            <button
              onClick={navLogin}
              type="button"
              className="btn btn-primary btn-sm mx-2"
            >
              Login
            </button>
            <button
              onClick={navRegister}
              type="button"
              className="btn btn-primary btn-sm"
            >
              Register
            </button>
          </div>
        </div>
      </nav>
      <section className="mt-5">
        <div className="container-fluid">
          <div className="row p-1 mx-3">
            <div className="col">
              <h4>Control your store</h4>
              <p>
                mmarkets is a simple tool, designed to control your store in an
                efficient way. mmarkets is a simple tool, designed to control
                your store in an efficient way. mmarkets is a simple tool,
                designed to control your store in an efficient way.
              </p>
              <button onClick={navRegister} className="btn btn-success">
                EMPIEZA AHORA
              </button>
            </div>
            <div className="col">
              <Signin />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
