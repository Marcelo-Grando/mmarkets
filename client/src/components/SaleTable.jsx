import { useState } from "react";
import Product from "./Product";

export default function SaleTable({ products, addElements }) {

  //buscar convertir a un acordeon y sacar el useState()
  
  const [value, setValue] = useState(false)

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
