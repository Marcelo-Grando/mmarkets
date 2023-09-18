export default function AdministratorForm({
  handleSubmit,
  handleInputsChange,
  administrator,
}) {
  return (
    <div className="p-2 mx-2">
      <div className="abs-center text-center">
        <form className="border p-2 form" onSubmit={handleSubmit}>
          <h4>create administrator</h4>
          <div className="form-group p-1">
            <input
              autoFocus
              className="form-control"
              name="name"
              placeholder="name"
              onChange={handleInputsChange}
              value={administrator.name}
            />
          </div>
          <div className="form-group p-1">
            <input
              className="form-control"
              name="lastname"
              placeholder="lastname"
              onChange={handleInputsChange}
              value={administrator.lastname}
            />
          </div>
          <div className="form-group p-1">
            <input
              className="form-control"
              name="dni"
              placeholder="dni"
              onChange={handleInputsChange}
              value={administrator.dni}
            />
          </div>
          <div className="form-group p-1">
            <input
              className="form-control"
              name="email"
              type="email"
              placeholder="email"
              onChange={handleInputsChange}
              value={administrator.email}
            />
          </div>
          <div className="form-group p-1">
            <input
              className="form-control"
              name="password"
              type="password"
              placeholder="password"
              onChange={handleInputsChange}
              value={administrator.password}
            />
          </div>
          <div className="form-group m-1">
            <button className="btn bg-info w-100">Create</button>
          </div>
        </form>
      </div>
    </div>
  );
}
