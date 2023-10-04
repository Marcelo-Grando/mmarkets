export default function Form({
  handleInputsChange,
  handleSubmit,
  value,
  title,
  btnText
}) {
  return (
    <div className="p-2">
    <div className="abs-center text-center">
      <form className="border p-3 form" onSubmit={handleSubmit}>
        <h4 className="aling-middle p-2">{title}</h4>
        <div className="form-group p-1">
          <input
            autoFocus
            className="form-control"
            name="name"
            placeholder="name"
            onChange={handleInputsChange}
            value={value.name}
          />
        </div>
        <div className="form-group p-1">
          <input
          className="form-control"
            name="lastname"
            placeholder="lastname"
            onChange={handleInputsChange}
            value={value.lastname}
          />
        </div>
        <div className="form-group p-1">
          <input
            className="form-control"
            name="dni"
            placeholder="dni"
            onChange={handleInputsChange}
            value={value.dni}
          />
        </div>
        <div className="form-group p-1">
          <input
            className="form-control"
            name="email"
            type="email"
            placeholder="email"
            onChange={handleInputsChange}
            value={value.email}
          />
        </div>
        <div className="form-group p-1">
          <input
            className="form-control"
            name="password"
            type="password"
            placeholder="password"
            onChange={handleInputsChange}
            value={value.password}
          />
        </div>
        <div className="form-group m-1">
            <button className="btn bg-info w-100">{btnText}</button>
          </div>
      </form>
    </div>
  </div>
  );
}
