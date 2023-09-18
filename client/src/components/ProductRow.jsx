export default function ProductRow({ product, addElements }) {
  return (
    <>
      <td>{product.product} </td>
      <td>{product.description}</td>
      <td>$ {product.price}</td>
      <button
          onClick={() => {
            addElements({
              product_id: product.product_id,
              product: product.product,
              description: product.description,
              price: Number(product.price),
              quantify: 1,
            });
          }}
        >
          
          +
        </button>
    </>
  );
}
