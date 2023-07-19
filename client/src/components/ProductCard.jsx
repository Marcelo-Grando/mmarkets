export default function ProductCard({ product }) {
  return (
    <div>
      <span>{product.product}</span>
      <span> {product.description}</span>
      <span> x {product.quantify}</span>
      <span> $ {product.price * product.quantify}</span>
      <button>-</button>
      <button>+</button>
    </div>
  );
}
