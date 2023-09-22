import axios from "axios";

export const getAdministrators = async (market) =>
  await axios.get(`http://localhost:3000/api/administrators/${market}`);

export const getAdministrator = async (market, administrator_id) =>
  await axios.get(
    `http://localhost:3000/api/administrators/${market}/${administrator_id}`
  );

export const sendAdministrator = async (administrator, market_id) =>
  await axios.post(
    `http://localhost:3000/api/administrators/${market_id}`,
    administrator
  );

export const deleteAdministrator = async (administrator_id, market_id) =>
  await axios.delete(
    `http://localhost:3000/api/administrators/${market_id}/${administrator_id}/`
  );
