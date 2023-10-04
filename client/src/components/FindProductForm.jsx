export default function FindProductForm({ findProductsByName, setProduct, product }) {
  return (
    <div className="p-2">
      <div className="abs-center text-center">
        <form className="border p-2 form" onSubmit={findProductsByName}>
          <h5>find product</h5>
          <div className="form-group p-1">
            <input
              className="form-control p-0"
              placeholder="product name"
              onChange={(e) => setProduct(e.target.value)}
              autoFocus
              value={product}
            />
          </div>
          <div className="form-group m-2">
            <button className="form-control bg-info p-0">find</button>
          </div>
        </form>
      </div>
    </div>
  );
}
