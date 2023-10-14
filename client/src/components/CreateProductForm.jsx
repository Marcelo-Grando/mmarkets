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
            <input list="categories"
            autoComplete="off"
              className="form-control p-0"
              placeholder="category"
              name="category"
              onChange={handleInputsChange}
              value={values.category}
            />
              <datalist id="categories">
              {categories.map((c, i) => (
                <option key={i} value={c.category} />
              ))}
            </datalist>
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
