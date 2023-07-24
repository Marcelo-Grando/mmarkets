import { useParams } from "react-router-dom";

export default function ProductCard({ product, removeProduct }) {

  const {market} = useParams()

  return (
    <>
    <div>
      <span>{product.product}</span>
      <span> {product.description}</span>
      <span> $ {product.price}</span>
      <button className="btn-update">update</button>
      <button className="btn-delete" onClick={() => removeProduct(product.product_id, market)}>delete</button>
    </div>
    </>
  );
}
