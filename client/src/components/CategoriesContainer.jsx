import CategoryCard from "./CategoryCard";

export default function CategoriesContainer({
  showCategories,
  setCategories,
  categories,
}) {
  return (
    <>
      <div>
        <h3>All Categories</h3>
        <button onClick={showCategories}>show</button>
        <button onClick={() => setCategories([])}>hide</button>
      </div>
      <div>
        {categories.map((c) => (
          <CategoryCard key={c.category_id} category={c} />
        ))}
      </div>
    </>
  );
}
