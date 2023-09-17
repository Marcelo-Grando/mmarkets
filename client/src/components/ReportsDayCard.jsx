export default function ReportsDayCard({ day }) {
  return (
    <div className="row w-25">
      <div className="col mx-1 my-2 px-2">
        <div className="category-card mx-5 py-2 px-4 w-100">
          <h4>{day.date}</h4>
          <h5>$ {day.amount}</h5>
        </div>
      </div>
    </div>
  );
}
