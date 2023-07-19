
export default function ReportsSellerCard({seller}) {
  return (
    <div>
        <h4>{seller.name} {seller.lastname}</h4>
        <p>Total sold: $ {seller.total_sold}</p>
    </div>
  )
}
