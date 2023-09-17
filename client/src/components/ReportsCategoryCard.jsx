export default function ReportsCategoryCard({ category }) {
  return (
    <div className="row w-25">
      <div className="col mx-1 my-2 px-2">
        <div className="category-card mx-5 py-2 px-4 w-100">
          <h4>{category.category}</h4>
          <p>quantify: {category.quantify}</p>
          <p>amount: $ {category.amount}</p>
          <p>{category.percentage}</p>
        </div>
      </div>
    </div>
  );
}
