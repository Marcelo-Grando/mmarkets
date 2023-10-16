export default function ProductCard({
  product,
  saleProducts,
  addProductsToSale,
  setSaleProducts,
  amount,
  setAmount,
  setIndexs,
  indexs,
}) {
  function deleteProductFromSale(product) {
    const elem = saleProducts.filter((e) => e.product_id != product.product_id);
    setAmount([...amount, -product.price * product.quantify]);
    const newIndexs = indexs.filter((i) => i != product.product_id);
    setIndexs([...newIndexs]);
    setSaleProducts([...elem]);
  }

  function substractQuantifyProduct(product) {
    saleProducts.forEach((e) => {
      if (e.product_id === product.product_id) {
        e.quantify = e.quantify - 1;
        setAmount([...amount, -e.price]);
      }
    });
    const items = saleProducts.filter((e) => e.quantify != 0);
    const newIndexs = indexs.filter((i) => i != product.product_id);
    setIndexs([...newIndexs]);
    setSaleProducts([...items]);
  }

  return (
    <div className="row">
      <span className="col border p-1">{product.product}</span>
      <span className="col border p-1">{product.description}</span>
      <span className="col-md-1 border p-1">x{product.quantify}</span>
      <span className="col border p-1">
        ${product.price * product.quantify}
      </span>
      <div className="col-md-2 p-0">
        <div className="btn-group p-0">
          <div className="btn px-2 border" onClick={() => addProductsToSale(product)}>
            +
          </div>
          <div className="btn px-2 border" onClick={() => substractQuantifyProduct(product)}>
            -
          </div>
          <div className="btn px-2 border bg-danger" onClick={() => deleteProductFromSale(product)}>
            x
          </div>
        </div>
      </div>
    </div>
  );
}
