export default function CategoryForm({ setCategory, handleSubmit, category }) {
  return (
    <div className="py-3">
      <div className="abs-center text-center">
        <form className="form border p-2 mx-4" onSubmit={handleSubmit}>
          <h4>create category</h4>
          <div className="form-group p-1">
          <input
          className="form-control p-0"
            type="text"
            placeholder="category name"
            onChange={(e) => setCategory(e.target.value)}
            value={category}
          />
          </div>
          <div className="form-group m-1">
              <button className="form-control bg-info p-0">create</button>
            </div>
        </form>
      </div>
    </div>
  );
}
