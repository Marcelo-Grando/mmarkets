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
  function deleteProduct(product) {
    const elem = saleProducts.filter((e) => e.product_id != product.product_id);
    setAmount([...amount, -product.price * product.quantify]);
    const newIndexs = indexs.filter((i) => i != product.product_id);
    setIndexs([...newIndexs]);
    setSaleProducts([...elem]);
  }

  function subtractElement(product) {
    saleProducts.forEach((e) => {
      if (e.product_id === product.product_id) {
        e.quantify = e.quantify - 1;
        setAmount([...amount, -e.price]);
      }
    });
    const items = elements.filter((e) => e.quantify != 0);
    const newIndexs = indexs.filter((i) => i != product.product_id);
    setIndexs([...newIndexs]);
    setSaleProducts([...items]);
  }

  return (
    <div className="row">
      <span className="col border p-0">{product.product}</span>
      <span className="col border p-0">{product.description}</span>
      <span className="col-md-1 border p-0">x{product.quantify}</span>
      <span className="col border p-0">
        ${product.price * product.quantify}
      </span>
      <div className="col-md-2 border p-0">
        <div className="btn-group">
          <div className="btn p-0" onClick={() => addProductsToSale(product)}>
            +
          </div>
          <div className="btn p-0" onClick={() => subtractElement(product)}>
            -
          </div>
          <div className="btn p-0" onClick={() => deleteProduct(product)}>
            x
          </div>
        </div>
      </div>
    </div>
  );
}
