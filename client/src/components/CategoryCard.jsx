export default function CategoryCard({ category, removeCategory }) {
  return <div className="category-card col m-2 border p-2 text-center">
    <div className="my-2">{category.category}</div>
    <button  onClick={() => removeCategory(category.category_id)} className="btn btn-danger py-0 px-1">delete</button>
  </div>;
}
