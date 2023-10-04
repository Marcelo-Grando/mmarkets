import ProductCard from "./ProductCard";

export default function SaleCard({
  saleProducts,
  setSaleProducts,
  makeSale,
  saleAmount,
  setAmount,
  amount,
  addProductsToSale,
  setIndexs,
  indexs,
}) {
  const { market_id, id } = JSON.parse(localStorage.getItem("userData"));

  return (
    <div className="container card border text-center">
      {saleProducts.map((e) => (
        <ProductCard
          saleProducts={saleProducts}
          addProductsToSale={addProductsToSale}
          setSaleProducts={setSaleProducts}
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
                setSaleProducts([]);
                setAmount("");
              }}
            >
              cancel
            </button>
            <button
              className="col mx-2 btn p-0 btn-success"
              onClick={() => {
                makeSale(saleProducts, market_id, id);
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
