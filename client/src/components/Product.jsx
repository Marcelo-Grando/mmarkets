import ProductRow from "./ProductRow";

export default function Product({ product, addElements }) {
  return (
    <>
      <tr className="">
        <ProductRow product={product} addElements={addElements} />
      </tr>
    </>
  );
}
