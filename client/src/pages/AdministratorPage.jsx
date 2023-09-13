import { useState, useEffect } from "react";
import { sendAdministrator, getAdministrators } from "../api/Administrators";

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

  async function loadAdministrators(market) {
    const response = await getAdministrators(market);
    setAdministrators(response.data);
  }

  useEffect(() => {
    loadAdministrators(market_id);
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
    console.log(response);
    setSeller({
      name: "",
      lastname: "",
      email: "",
      dni: "",
      password: "",
    });
  };

  return (
    <div>
      <div>
        <h3>Create Administrator</h3>
        <form onSubmit={handleSubmit}>
          <input
            name="name"
            placeholder="name"
            onChange={handleInputsChange}
            value={administrator.name}
          />
          <input
            name="lastname"
            placeholder="lastname"
            onChange={handleInputsChange}
            value={administrator.lastname}
          />
          <input
            name="dni"
            placeholder="dni"
            onChange={handleInputsChange}
            value={administrator.dni}
          />
          <input
            name="email"
            type="email"
            placeholder="email"
            onChange={handleInputsChange}
            value={administrator.email}
          />
          <input
            name="password"
            type="password"
            placeholder="password"
            onChange={handleInputsChange}
            value={administrator.password}
          />
          <button>Create</button>
        </form>
      </div>
      <div>
        <h3>Administrators</h3>
        {administrators.map((admin) => (
          <div key={admin.administrator_id}>
            <h4>{`${admin.name} ${admin.lastname}`}</h4>
            <h6>{admin.email}</h6>
            <h6>{`DNI: ${admin.dni}`}</h6>
            <button className="btn-update">update</button>
            <button>delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}
