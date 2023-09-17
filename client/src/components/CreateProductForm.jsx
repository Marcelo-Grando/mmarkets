export default function CreateProductForm({
  handleSubmitCreateForm,
  handleInputsChange,
  values,
  categories,
}) {
  return (
    <div className="p-2">
      <div className="abs-center text-center ">
        <form className="border p-2 form" onSubmit={handleSubmitCreateForm}>
          <h5>create product</h5>
          <div className="form-group p-0 m-1">
            <input
              className="form-control p-0"
              name="product"
              placeholder="product name"
              onChange={handleInputsChange} 
              value={values.product}
            />
          </div>
          <div className="form-group p-0 m-1">
            <input
              className="form-control p-0"
              name="description"
              placeholder="description"
              onChange={handleInputsChange}
              value={values.description}
            />
          </div>
          <div className="form-group p-0 m-1">
            <select
              className="form-control p-0"
              name="category"
              onChange={handleInputsChange}
              value={values.category}
            >
              <option>Select Category</option>
              {categories.map((c, i) => (
                <option key={i} value={c.category}>
                  {c.category}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group p-0 m-1">
            <input
              className="form-control p-0"
              name="price"
              placeholder="price"
              onChange={handleInputsChange}
              value={values.price}
            />
          </div>

          <div className="form-group my-2 mx-1">
            <button className="form-control bg-info p-0">create</button>
          </div>
        </form>
      </div>
    </div>
  );
}
