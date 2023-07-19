import ProductRow from "./ProductRow";

export default function Product({ product, addElements }) {
  return (
    <>
      <tr>
        <ProductRow product={product} addElements={addElements} />
      </tr>
    </>
  );
}
