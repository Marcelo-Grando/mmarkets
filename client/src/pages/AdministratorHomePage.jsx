import { Link, useParams, useNavigate } from "react-router-dom";
import { logout } from "../api/Signin";

export default function AdministratorHomePage() {
  const navigate = useNavigate();

  const closeSession = async () => {
    const response = await logout();
    console.log(("close session", response));
    navigate("/", { replace: true });
  };

  const { market } = useParams();

  return (
    <div>
      <h1>Market Name</h1>
      <h2>User Name</h2>
      <ul>
        <li>
          <Link to={`/reports-page/${market}`}>Reports</Link>
        </li>
        <li>
          <Link>Sales</Link>
        </li>
        <button onClick={closeSession}>Logout</button>
      </ul>
    </div>
  );
}
