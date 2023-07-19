import ProductCard from "./ProductCard";

export default function SaleCard({
  elements,
  setElements,
  makeSale,
  saleAmount,
  setAmount
}) {
  return (
    <div>
      <h2>Sale</h2>
      {elements.map((e) => (
        <ProductCard key={e.product_id} product={e} />
      ))}
      <h3>Amount: ${saleAmount}</h3>
      <button
        onClick={() => {
          alert("Cancelar Venta?");
          setElements([]);
          setAmount("")
        }}
      >
        cancel
      </button>
      <button
        onClick={() => {
          if (!elements.length) return console.log("ingrese productos");
          makeSale(elements);
        }}
      >
        sell
      </button>
    </div>
  );
}
