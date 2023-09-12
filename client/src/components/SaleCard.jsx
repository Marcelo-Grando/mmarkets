import ProductCard from "./ProductCard";
import { useParams } from "react-router-dom";

import UserContext from "../context/UserContext";
import { useContext } from "react";

export default function SaleCard({
  elements,
  setElements,
  makeSale,
  saleAmount,
  setAmount,
  amount,
  setFoundProducts,
  addElements,
  setIndexs,
  indexs,
}) {

  const {market, id} = JSON.parse(localStorage.getItem('userData'))

  return (
    <div className="sale-card">
      <h2>Sale</h2>
      {elements.map((e) => (
        <ProductCard
          elements={elements}
          addElements={addElements}
          setElements={setElements}
          key={e.product_id}
          product={e}
          amount={amount}
          setAmount={setAmount}
          setIndexs={setIndexs}
          indexs={indexs}
        />
      ))}
      <h4>Amount: ${saleAmount}</h4>
      <button
        onClick={() => {
          alert("Cancelar Venta?");
          setElements([]);
          setAmount("");
        }}
      >
        cancel
      </button>
      <button
        onClick={() => {
          console.log('local: ', JSON.parse(localStorage.getItem('user')))
          console.log('local desde el sigin: ', JSON.parse(localStorage.getItem('userData')))
          makeSale(elements, market, id);
          setFoundProducts([]);
        }}
      >
        sell
      </button>
    </div>
  );
}
