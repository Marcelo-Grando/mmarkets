import Product from "./Product";

export default function SaleTable({ products, addElements }) {
  return (
    <table>
      <caption>Products</caption>
      <tbody>
        {products.map((p) => (
          <Product key={p.product_id} product={p} addElements={addElements} />
        ))}
      </tbody>
    </table>
  );
}
