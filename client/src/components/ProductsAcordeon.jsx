import { useState } from "react";
import ProductsCard from "./ProductsCard";

export default function ProductsAcordeon({ products, removeProduct }) {

  return (
    <div>
      <h3>Acordeon Productos</h3>
      <div>
        {products.map((p) => (
          <ProductsCard key={p.product_id} product={p} removeProduct={removeProduct}/>
        ))}
      </div>
    </div>
  );
}
