import ProductsCard from "./ProductsCard";

export default function ProductsAcordeon({ products, removeProduct }) {

  return (
    <div className="col m-3">
        {products.map((p) => (
          <ProductsCard key={p.product_id} product={p} removeProduct={removeProduct}/>
        ))}
    </div>
  );
}
