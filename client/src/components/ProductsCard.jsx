export default function ProductCard({ product }) {
  return (
    <div>
      <span>{product.product}</span>
      <span> {product.description}</span>
      <span> $ {product.price}</span>
      <button className="btn-update">update</button>
      <button className="btn-delete">delete</button>
    </div>
  );
}
