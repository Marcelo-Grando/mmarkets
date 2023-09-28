export default function ReportsProductCard({ product }) {
  return (
    <div className="row w-25">
      <div className="col mx-1 my-2 px-2">
        <div className="category-card mx-5 py-2 px-4 w-100">
          <h3>{product.product}</h3>
          <h4>{product.description}</h4>
          <p>quantify: {product.quantify}</p>
          <p>$ {product.amount}</p>
          <p>{product.percentage}</p>
        </div>
      </div>
    </div>
  );
}
