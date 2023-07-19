import { useEffect, useState } from "react";
import { getSellers, sendSeller } from "../api/Sellers";
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

  async function loadSellers() {
    const response = await getSellers();
    setSellers(response.data);
  }

  useEffect(() => {
    loadSellers();
  }, []);

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
    const response = await sendSeller(seller);
    setSellers([...sellers, response.data]);
    console.log(response.data);
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
        <h3>Sellers</h3>
        {sellers.map((s) => (
          <SellerCard
            key={s.seller_id}
            name={s.name}
            lastname={s.lastname}
            email={s.email}
            dni={s.dni}
          />
        ))}
      </div>
      <div>
        <h3>Create Seller</h3>
        <SellerForm
          handleSubmit={handleSubmit}
          handleInputsChange={handleInputsChange}
          seller={seller}
        />
      </div>
    </>
  );
}
