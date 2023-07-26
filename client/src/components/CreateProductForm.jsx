
export default function CreateProductForm({
  handleSubmitCreateForm,
  handleInputsChange,
  values,
  categories
}) {
  return (
    <form onSubmit={handleSubmitCreateForm}>
      <input
        name="product"
        placeholder="product name"
        onChange={handleInputsChange}
        value={values.product}
      />
      <input
        name="description"
        placeholder="description"
        onChange={handleInputsChange}
        value={values.description}
      />
      <select name="category" onChange={handleInputsChange} value={values.category}>
      <option>Select Category</option>
      {
        categories.map((c, i) => <option key={i} value={c.category}>{c.category}</option>)
      }
      </select>
      <input
        name="price"
        placeholder="price"
        onChange={handleInputsChange}
        value={values.price}
      />
      <button>Create Product</button>
    </form>
  );
}
