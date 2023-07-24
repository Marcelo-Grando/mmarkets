import { useState } from "react";
import CategoryForm from "../components/categoryForm";
import CategoriesContainer from "../components/CategoriesContainer";
import { sendCategory, getCategories, deleteCategory } from "../api/Categories";
import { useParams } from "react-router-dom";

export default function CategoriesPage() {
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState("");

  const {market} = useParams()

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!category) return console.log("ingrese nombre de la categoria");
    const match = categories.filter((c) => c.category === category);
    !match.length
      ? sendCategory(category, market)
      : console.log(`La categoria ${category} ya existe`);
    setCategory("");
  };

  const showCategories = async () => {
    const response = await getCategories(market);
    setCategories(response.data);
  };

  const removeCategory = async (category_id) => {
    const response = await deleteCategory(market, category_id)
    console.log(response)
  }

  return (
    <>
    <h3>Create Category</h3>
      <CategoryForm
        setCategory={setCategory}
        handleSubmit={handleSubmit}
        category={category}
      />
      <CategoriesContainer
      removeCategory={removeCategory}
        showCategories={showCategories}
        setCategories={setCategories}
        categories={categories}
      />
    </>
  );
}
