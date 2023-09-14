import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { createAccount } from "../api/Home";

import Signin from '../components/Signin'

export default function CreateAccountPage() {

const type = localStorage.getItem('type')

  const [account, setAccount] = useState({
    market: "",
    adress: "",
    email: "",
    password: "",
  });

  const [pointer, setPointer] = useState(type)

  const navigate = useNavigate();

  const handleInputsChange = (e) => {
    const { name, value } = e.target;
    setAccount({
      ...account,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await createAccount(account);
    console.log(response);
    setAccount({
      market: "",
      adress: "",
      email: "",
      password: "",
    });
    response && setPointer(true)
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-body-tertiaty px-2">
        <h2 className="logo" onClick={() => navigate("/")}>
          Mmarket'S
        </h2>
        <div className="container-fluid">
          <ul className="navbar-nav justify-content-end">
            <li className="nav-item">
              <Link className="nav-link">utilities</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link">tutorials</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link">prices</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link">About</Link>
            </li>
          </ul>
        </div>
        <button onClick={() => setPointer('signin')} type="button" class="btn btn-primary btn-sm mx-2">Login</button>
        <button onClick={() => setPointer('register')} type="button" class="btn btn-primary btn-sm">Register</button>
      </nav>
      <div className="container-fluid">
        <div className="row p-1 mx-3 inline">
        
            {
                pointer === 'signin' && <div className="col"><Signin/></div>
            }
            {
                pointer === 'register' && <div className="col">
                <div className="abs-center text-center">
                  <form
                    className="border p-3 form"
                    action=""
                    onSubmit={handleSubmit}
                  >
                    <h4 className="align-middle p-2">Create Account</h4>
                    <div className="form-group p-2">
                      <input
                        className="form-control"
                        type="text"
                        name="market"
                        placeholder="market name"
                        onChange={handleInputsChange}
                        value={account.market}
                      />
                    </div>
                    <div className="form-group p-2">
                      <input
                        className="form-control"
                        type="text"
                        name="adress"
                        placeholder="adress"
                        onChange={handleInputsChange}
                        value={account.adress}
                      />
                    </div>
                    <div className="form-group p-2">
                      <input
                        className="form-control"
                        type="email"
                        name="email"
                        placeholder="email"
                        onChange={handleInputsChange}
                        value={account.email}
                      />
                    </div>
                    <div className="form-group p-2">
                      <input
                        className="form-control"
                        type="password"
                        name="password"
                        placeholder="password"
                        onChange={handleInputsChange}
                        value={account.password}
                      />
                    </div>
                    <div className="form-group p-2">
                      <button className="form-control bg-info">
                        create acount
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            }
        </div>
      </div>
    </div>
  );
}
