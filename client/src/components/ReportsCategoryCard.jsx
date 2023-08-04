
export default function ReportsCategoryCard({category}) {

  return (
    <div>
        <h4>category: {category.category}</h4>
        <p>quantify: {category.quantify}</p>
        <p>amount: $ {category.amount}</p>
        <p>percentage: % {category.percentage}</p>
    </div>
  )
}
