import React from "react";

export default function CreateProductForm({
  handleSubmitCreateForm,
  handleInputsChange,
  values,
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
      <input
        name="category"
        placeholder="category"
        onChange={handleInputsChange}
        value={values.category}
      />
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
