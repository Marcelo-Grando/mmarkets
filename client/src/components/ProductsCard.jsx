
export default function ProductCard({ product, removeProduct }) {

  const {market_id} = JSON.parse(localStorage.getItem('userData'))

  return (
    <>
    <div className="row ">
      <span className="col p-0 border">{product.product}</span>
      <span className="col p-0 border"> {product.description}</span>
      <span className="col p-0 border"> <b>{product.category}</b></span>
      <span className="col p-0 border"> $ {product.price}</span>
      <button className="col btn btn-success p-0 m-1">update</button>
      <button className="col btn btn-danger p-0 m-1" onClick={() => removeProduct(product.product_id, market_id)}>delete</button>
    </div>
    </>
  );
}
