export default function ProductCard({
  product,
  elements,
  addElements,
  setElements,
  amount,
  setAmount,
  setIndexs,
  indexs,
}) {
  function deleteProduct(product) {
    const elem = elements.filter((e) => e.product_id != product.product_id);
    setAmount([...amount, -product.price * product.quantify]);
    const newIndexs = indexs.filter((i) => i != product.product_id);
    setIndexs([...newIndexs]);
    setElements([...elem]);
  }

  function subtractElement(product) {
    elements.forEach((e) => {
      if (e.product_id === product.product_id) {
        e.quantify = e.quantify - 1;
        setAmount([...amount, -e.price]);
      }
    });
    const items = elements.filter((e) => e.quantify != 0);
    setElements([...items]);
  }

  return (
    <div>
      <span>{product.product}</span>
      <span> {product.description}</span>
      <span> x {product.quantify}</span>
      <span> $ {product.price * product.quantify}</span>
      <button onClick={() => addElements(product)}>+</button>
      <button onClick={() => subtractElement(product)}>-</button>
      <button onClick={() => deleteProduct(product)}>dell</button>
    </div>
  );
}
