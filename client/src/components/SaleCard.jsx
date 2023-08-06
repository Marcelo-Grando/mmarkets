import ProductCard from "./ProductCard";
import { useParams } from "react-router-dom";

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

  const {market, seller_id} = useParams()

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
          makeSale(elements, market, seller_id);
          setFoundProducts([]);
        }}
      >
        sell
      </button>
    </div>
  );
}
