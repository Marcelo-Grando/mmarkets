
export default function ProductCard({ product, removeProduct }) {

  const {market_id} = JSON.parse(localStorage.getItem('userData'))

  return (
    <>
    <div>
      <span>{product.product}</span>
      <span> {product.description}</span>
      <span> <b>{product.category}</b></span>
      <span> $ {product.price}</span>
      <button className="btn-update">update</button>
      <button className="btn-delete" onClick={() => removeProduct(product.product_id, market_id)}>delete</button>
    </div>
    </>
  );
}
