import { useState } from "react";
import Product from "./Product";

export default function SaleTable({ products, addElements }) {

  //buscar convertir a un acordeon y sacar el useState()
  
  const [value, setValue] = useState(false)

  return (
    <table className="table table-warning table-striped w-50 p-3">
      <caption onClick={() => setValue(value?false:true)}>Products</caption>
      <tbody>
        {value? products.map((p) => (
          <Product key={p.product_id} product={p} addElements={addElements} />
        )): <tr></tr>}
      </tbody>
    </table>
  );
}
