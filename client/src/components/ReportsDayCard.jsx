

export default function ReportsDayCard({day}) {
  return (
    <div>
        <h4>Day: {day.date}</h4>
        <p>Amount: ${day.amount}</p>
    </div>
  )
}
