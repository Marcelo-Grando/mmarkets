import AdministratorNav from "../components/AdministratorNav";
import AdministratorForm from "../components/AdministratorForm";

import { useMembers } from "../hooks/useMembers";

export default function AdministratorPage() {
  const [administrators, handleInputsChange, handleSubmit, administrator, removeAdministrator, updateSellerInfo] = useMembers();

  console.log(administrator)

  return (
    <div>
      <AdministratorNav />
      <div className="conteiner-fluid">
        <div className="row p-1 mx-1">
          <div className="col">
            <AdministratorForm
              handleSubmit={handleSubmit}
              handleInputsChange={handleInputsChange}
              administrator={administrator}
            />
          </div>
          <div className="col my-1">
            {administrators && administrators.map((admin) => (
              <div
                className="col seller-card p-2 m-1 text-center"
                key={admin.administrator_id}
              >
                <h4>{`${admin.name} ${admin.lastname}`}</h4>
                <h6>{admin.email}</h6>
                <h6>{`DNI: ${admin.dni}`}</h6>
                <div className="row m-1">
                  <button className="col btn btn-info mx-1 p-0">update</button>
                  <button onClick={() => removeAdministrator(admin.administrator_id )} className="col btn btn-danger mx-1 p-1">
                    delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
