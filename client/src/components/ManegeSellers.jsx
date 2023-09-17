import SellerForm from "./SellerForm"
import SellerCard from "./SellerCard"

import { useState, useEffect } from "react";

import { getSellers, sendSeller, deleteSeller, updateSeller } from "../api/Sellers";

export default function ManegeSellers() {

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
    <div className="container-fluid">
          <div className="row p-1 mx-1">
            <div className="col">
              <SellerForm
                handleSubmit={handleSubmit}
                handleInputsChange={handleInputsChange}
                seller={seller}
              />
            </div>
            <div className="col">
              <div className="container-fluid">
              <div className="row text-center">
                {sellers.map((seller, index) => (
                  <SellerCard
                  key={index}
                  seller_id={seller.seller_id}
                  name={seller.name}
                  lastname={seller.lastname}
                  email={seller.email}
                  dni={seller.dni}
                  removeSeller={removeSeller}
                  seller={seller}
                  updateSellerInfo={updateSellerInfo}
                />
                ))}
              </div>
              </div>
            </div>
          </div>
          </div>
  )
}
