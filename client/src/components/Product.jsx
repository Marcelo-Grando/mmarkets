import ProductRow from "./ProductRow";

export default function Product({ product, addProductsToSale }) {
  return (
    <>
      <tr className="">
        <ProductRow product={product} addProductsToSale={addProductsToSale} />
      </tr>
    </>
  );
}
