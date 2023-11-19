import { useState, useEffect } from "react";
import CategoryForm from "../components/categoryForm";
import CategoriesContainer from "../components/CategoriesContainer";
import { sendCategory, getCategories, deleteCategory } from "../api/Categories";

export default function CategoriesPage() {
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState("");

  const {market_id} = JSON.parse(localStorage.getItem("user"))


  const loadCategories = async () => {
    const response = await getCategories(market_id);
    console.log(response)
    setCategories(response.data);
  };

  useEffect(() => {
    loadCategories()
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!category) return console.log("ingrese nombre de la categoria");
    const match = categories.filter((c) => c.category === category);
    if (!match.length) {
      const response = await sendCategory(category, market_id);
      loadCategories();
      setCategory("");
      console.log(response);
      return;
    }
    alert(`La categoria ${category} ya existe`);
    setCategory("");
  };

  const removeCategory = async (category_id) => {
    const response = await deleteCategory(market_id, category_id);
    loadCategories();
    console.log(response);
  };

  return (
    <div className="px-3">
      <div className="container-fluid p-0">
        <div className="row">
          <div className="container w-25 p-0">
          <div className="col">
            <CategoryForm
              setCategory={setCategory}
              handleSubmit={handleSubmit}
              category={category}
            />
          </div>
          </div>
          
          <div className="col p-2">
            <CategoriesContainer
              removeCategory={removeCategory}
              categories={categories}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
