import React from "react";

export default function FindProductForm({ handleSubmit, setProduct, product }) {
  return (
    <form onSubmit={handleSubmit}>
      <input
        placeholder="product name"
        onChange={(e) => setProduct(e.target.value)}
        autoFocus
        value={product}
      />
      <button>find</button>
    </form>
  );
}
