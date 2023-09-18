import CategoryCard from "./CategoryCard";

export default function CategoriesContainer({
  removeCategory,
  categories,
}) {
  return (
      <div className="row">
        {categories.map((c) => (
            <CategoryCard removeCategory={removeCategory} key={c.category_id} category={c} />
        ))}
      </div>
  );
}
