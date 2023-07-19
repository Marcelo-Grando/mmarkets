export default function CategoryForm({ setCategory, handleSubmit, category }) {
  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="category name"
          onChange={(e) => setCategory(e.target.value)}
          value={category}
        />
        <button>save</button>
      </form>
    </>
  );
}
