import CategoryCard from "./CategoryCard";

export default function CategoriesContainer({
  removeCategory,
  loadCategories,
  setCategories,
  categories,
}) {
  return (
    <>
      <div>
        <h3>All Categories</h3>
        <button onClick={loadCategories}>show</button>
        <button onClick={() => setCategories([])}>hide</button>
      </div>
      <div>
        {categories.map((c) => (
          <CategoryCard removeCategory={removeCategory} key={c.category_id} category={c} />
        ))}
      </div>
    </>
  );
}
