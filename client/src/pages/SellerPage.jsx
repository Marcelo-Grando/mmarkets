import { useEffect, useState } from "react";
import { NavLink, Outlet, useParams } from "react-router-dom";
import {
  getSellers,
  sendSeller,
  updateSeller,
  deleteSeller,
} from "../api/Sellers";
import SellerCard from "../components/SellerCard";
import SellerForm from "../components/SellerForm";

export default function SellerPage() {
  const [sellers, setSellers] = useState([]);
  const [seller, setSeller] = useState({
    name: "",
    lastname: "",
    email: "",
    dni: "",
    password: "",
  });
  const { market_id } = JSON.parse(localStorage.getItem("userData"));

  async function loadSellers() {
    const response = await getSellers(market_id);
    setSellers(response.data);
  }

  useEffect(() => {
    loadSellers();
  }, []);

  const removeSeller = async (seller_id) => {
    const response = await deleteSeller(seller_id, market_id);
    console.log(response);
    loadSellers();
  };

  const updateSellerInfo = async (seller_id, seller) => {
    const response = await updateSeller(seller_id, seller);
    console.log(response.data);
  };

  const handleInputsChange = (e) => {
    const { name, value } = e.target;
    setSeller({
      ...seller,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await sendSeller(seller, market_id);
    console.log(response);
    loadSellers();
    setSeller({
      name: "",
      lastname: "",
      email: "",
      dni: "",
      password: "",
    });
  };

  return (
    <>
      <div>
        <div class="container-fluid border border-dark text-center">
          <div class="row p-0">
            <div class="col btn-gr">
              <NavLink className="nav-link">create seller</NavLink>
            </div>
            <div class="col btn-gr">
              <NavLink className="nav-link">statistics sellers</NavLink>
            </div>
            <div class="col btn-gr">
              <NavLink className="nav-link">sellers info</NavLink>
            </div>
            <div class="col btn-gr">
              <NavLink className="nav-link">resume</NavLink>
            </div>
            <div class="col btn-gr">
              <NavLink className="nav-link">payments</NavLink>
            </div>
          </div>
        </div>
        <div>
          <Outlet/>
        </div>
        <div className="conteiner-fluid">
          <div className="row p-1 mx-3">
            <div className="col">
              <SellerForm
                handleSubmit={handleSubmit}
                handleInputsChange={handleInputsChange}
                seller={seller}
              />
            </div>
            <div className="col">
              <button className="btn bg-info w-100 my-3">sellers Info</button>
              <button className="btn bg-info w-100 my-3">
                sellers statistics
              </button>
              <button className="btn bg-info w-100 my-3">sellers turnes</button>
              <button className="btn bg-info w-100 my-3">sellers resume</button>
              <button className="btn bg-info w-100 my-3">
                sellers payments
              </button>
              <button className="btn bg-info w-100 my-3">
                sellers settings
              </button>
            </div>
          </div>
        </div>
      </div>
      <div>
        <h3>Sellers</h3>
        <div className="d-flex flex-wrap">
          {sellers.map((s) => (
            <SellerCard
              key={s.seller_id}
              seller_id={s.seller_id}
              name={s.name}
              lastname={s.lastname}
              email={s.email}
              dni={s.dni}
              removeSeller={removeSeller}
              seller={s}
              updateSellerInfo={updateSellerInfo}
            />
          ))}
        </div>
      </div>
    </>
  );
}
