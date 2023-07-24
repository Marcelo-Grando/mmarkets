import { useState } from "react";
import Product from "./Product";

export default function SaleTable({ products, addElements }) {

  const [value, setValue] = useState(false)

  console.log(value)

  return (
    <table>
      <caption onClick={() => setValue(value?false:true)}>Products</caption>
      <tbody>
        {value? products.map((p) => (
          <Product key={p.product_id} product={p} addElements={addElements} />
        )): () => setValue(false)}
      </tbody>
    </table>
  );
}
