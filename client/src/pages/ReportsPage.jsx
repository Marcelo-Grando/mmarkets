import { NavLink, Outlet } from "react-router-dom";

export default function ReportsPage() {
  return (
    <main>
      <nav className="container-fluid border border-dark text-center">
        <div className="row">
          <div className="col btn-gr">
            <NavLink to={"sales"} className="nav-link">
              sales reports
            </NavLink>
          </div>
          <div className="col btn-gr">
            <NavLink to={"sellers"} className="nav-link">
              sellers reports
            </NavLink>
          </div>
          <div className="col btn-gr">
            <NavLink to={"tickets"} className="nav-link">
              sales
            </NavLink>
          </div>
          <div className="col btn-gr">
            <NavLink to={"statistics"} className="nav-link">statistics</NavLink>
          </div>
          <div className="col btn-gr">
            <NavLink className="nav-link">annual balance</NavLink>
          </div>
        </div>
      </nav>
      <section>
        <div className="container-fluid">
          <Outlet />
        </div>
      </section>
    </main>
  );
}
