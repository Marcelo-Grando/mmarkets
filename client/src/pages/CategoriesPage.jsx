import React, { useState } from "react";
import CategoryForm from "../components/categoryForm";
import CategoriesContainer from "../components/CategoriesContainer";
import { sendCategory, getCategories } from "../api/Categories";

export default function CategoriesPage() {
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if(!category) return console.log('ingrese nombre de la categoria')
    sendCategory(category);
    setCategory("");
  };

  const showCategories = async () => {
    const response = await getCategories();
    setCategories(response.data);
  };

  return (
    <>
      <CategoryForm
        setCategory={setCategory}
        handleSubmit={handleSubmit}
        category={category}
      />
      <CategoriesContainer
        showCategories={showCategories}
        setCategories={setCategories}
        categories={categories}
      />
    </>
  );
}
