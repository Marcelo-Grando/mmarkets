import { pool } from "../db.js";

export const verifyUser = async (email) => {
  const [[seller]] = await pool.query("SELECT *, seller_id AS id FROM sellers WHERE email = ?", [
    email,
  ]);

  const [[market]] = await pool.query("SELECT *, market_id AS id FROM markets WHERE email = ?", [
    email,
  ]);

  const [[administrator]] = await pool.query(
    "SELECT *, administrator_id AS id FROM administrators WHERE email = ?",
    [email]
  );

  if (!seller && !market && !administrator) return;

  if (seller) return seller;

  if (administrator) return administrator;

  if (market) return market; 
};
