import { useState } from "react";
import CategoryForm from "../components/categoryForm";
import CategoriesContainer from "../components/CategoriesContainer";
import { sendCategory, getCategories, deleteCategory } from "../api/Categories";
import { useParams } from "react-router-dom";

export default function CategoriesPage() {
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState("");

  const {market} = useParams()

  const loadCategories = async () => {
    const response = await getCategories(market)
    setCategories(response.data)
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!category) return console.log("ingrese nombre de la categoria");
    const match = categories.filter((c) => c.category === category);
    if(!match.length) {
      const response = await sendCategory(category, market)
      loadCategories()
      setCategory("");
      console.log(response)
      return
    }
    alert(`La categoria ${category} ya existe`);
    setCategory("");
  };

  const removeCategory = async (category_id) => {
    const response = await deleteCategory(market, category_id)
    loadCategories()
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
        loadCategories={loadCategories}
        setCategories={setCategories}
        categories={categories}
      />
    </>
  );
}
