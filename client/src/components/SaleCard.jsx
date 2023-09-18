import ProductCard from "./ProductCard";

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
  const { market_id, id } = JSON.parse(localStorage.getItem("userData"));

  return (
    <div className="container card border text-center">
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
      {saleAmount != "00" && (
        <div className="text-center">
          <h4>$ {saleAmount}</h4>
          <div className="row m-2">
          <button
          className="col mx-2 p-0 btn btn-danger"
            onClick={() => {
              alert("Cancelar Venta?");
              setElements([]);
              setAmount("");
            }}
          >
            cancel
          </button>
          <button
          className="col mx-2 btn p-0 btn-success"
            onClick={() => {
              console.log("local: ", JSON.parse(localStorage.getItem("user")));
              console.log(
                "local desde el sigin: ",
                JSON.parse(localStorage.getItem("userData"))
              );
              makeSale(elements, market_id, id);
              setFoundProducts([]);
            }}
          >
            sell
          </button>
          </div>
        </div>
      )}
    </div>
  );
}
