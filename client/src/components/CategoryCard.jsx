export default function CategoryCard({ category, removeCategory }) {
  return <div className="category-card col m-2 border p-2 text-center">
    <span className="my-3">{category.category}</span>
    <button  onClick={() => removeCategory(category.category_id)} className="btn btn-danger">delete</button>
  </div>;
}
