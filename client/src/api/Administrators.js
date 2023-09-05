import axios from "axios";

export const getAdministrators = async (market) =>
  await axios.get(`http://localhost:3000/api/administrators/${market}`);

export const getAdministrator = async (market, administrator_id) =>
  await axios.get(
    `http://localhost:3000/api/administrators/${market}/${administrator_id}`
  );

export const sendAdministrator = async (market, administrator) =>
  await axios.post(
    `http://localhost:3000/api/administrators/${market}`,
    administrator
  );
