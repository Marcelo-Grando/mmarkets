import ProductsCard from "./ProductsCard";

export default function ProductsAcordeon({ products }) {
  return (
    <div>
      <h3>Acordeon Productos</h3>
      <div>
        {products.map((p) => (
          <ProductsCard key={p.product_id} product={p} />
        ))}
      </div>
    </div>
  );
}
