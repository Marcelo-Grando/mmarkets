import ProductsCard from "./ProductsCard";

export default function ProductsFoundContainer({ productsFound }) {
  return (
    <div>
      {productsFound?.map((p) => (
        <ProductsCard key={p.product_id} product={p} />
      ))}
    </div>
  );
}
