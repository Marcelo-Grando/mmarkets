import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getSellers, sendSeller, updateSeller, deleteSeller } from "../api/Sellers";
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
  const {market} = useParams()

  async function loadSellers() {
    const response = await getSellers(market);
    setSellers(response.data);
  }

  useEffect(() => {
    loadSellers();
  }, []);

  const removeSeller = async (seller_id) => {
    const response = await deleteSeller(seller_id, market)
    console.log(response)
    loadSellers()
  }

  const updateSellerInfo = async (seller_id, seller) => {
    const response = await updateSeller(seller_id, seller)
    console.log(response.data)
  }

  const handleInputsChange = (e) => {
    const { name, value } = e.target;
    setSeller({
      ...seller,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (Object.values(seller).includes("")) return console.log("faltan datos");
    const response = await sendSeller(seller, market);
    console.log(response)
    setSellers([...sellers, response.data]); 
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
        <h3>Create Seller</h3>
        <SellerForm
          handleSubmit={handleSubmit}
          handleInputsChange={handleInputsChange}
          seller={seller}
        />
      </div>
      <div>
        <h3>Sellers</h3>
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
    </>
  );
}
