export default function CategoryCard({ category, removeCategory }) {
  return <div>
    <span>{category.category}</span>
    <button onClick={() => removeCategory(category.category_id)} className="btn-delete">delete</button>
  </div>;
}
