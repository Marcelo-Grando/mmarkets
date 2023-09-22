import { useState, useEffect } from "react";
import { sendAdministrator, getAdministrators } from "../api/Administrators";

import AdministratorNav from "../components/AdministratorNav";
import AdministratorForm from "../components/AdministratorForm";

export default function AdministratorPage() {
  const { market_id } = JSON.parse(localStorage.getItem("userData"));

  const [administrators, setAdministrators] = useState([]);
  const [administrator, setAdministrator] = useState({
    name: "",
    lastname: "",
    email: "",
    dni: "",
    password: "",
  });

  async function loadAdministrators() {
    const response = await getAdministrators(market_id);
    setAdministrators(response.data);
  }

  useEffect(() => {
    loadAdministrators();
  }, []);

  const handleInputsChange = (e) => {
    const { name, value } = e.target;
    setAdministrator({
      ...administrator,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await sendAdministrator(market_id, administrator);
    loadAdministrators()
    setAdministrator({
      name: "",
      lastname: "",
      email: "",
      dni: "",
      password: "",
    });
  };

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
                  <button className="col btn btn-danger mx-1 p-1">
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
