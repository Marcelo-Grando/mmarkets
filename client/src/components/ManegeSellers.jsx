import SellerForm from "./SellerForm";
import SellerCard from "./SellerCard";

import { useMembers } from "../hooks/useMembers";

export default function ManegeSellers() {
  const type = 'seller'

  const [sellers, handleInputsChange, handleSubmit, seller, removeSeller, updateSellerInfo] = useMembers(type);

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
        <div className="col my-1">
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
                  market_id= {seller.market_id}
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
  );
}
