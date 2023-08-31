import { pool } from "../db.js";

export const verifiedPassword = async (dni, user_id, user_password) => {
  const [[seller_password]] = await pool.query(
    "SELECT AES_DECRYPT(password, ?) AS value FROM sellers WHERE seller_id = ?",
    [dni, user_id]
  );
  const [[market_password]] = await pool.query(
    "SELECT AES_DECRYPT(password, 'secret') AS value FROM markets WHERE market_id = ?",
    [user_id]
  );
  const [[administrator_password]] = await pool.query(
    "SELECT AES_DECRYPT(password, ?) AS value FROM administrators WHERE administrator_id = ?",
    [dni, user_id]
  );

  if (seller_password)
    return seller_password.value.toString() === user_password;
  if (market_password)
    return market_password.value.toString() === user_password;
  if (administrator_password)
    return administrator_password.value.toString() === user_password;
};

export const verifyUser = async (email) => {
  const [[seller]] = await pool.query(
    "SELECT *, seller_id AS id FROM sellers WHERE email = ?",
    [email]
  );

  const [[market]] = await pool.query(
    "SELECT *, market_id AS id FROM markets WHERE email = ?",
    [email]
  );

  const [[administrator]] = await pool.query(
    "SELECT *, administrator_id AS id FROM administrators WHERE email = ?",
    [email]
  );

  if (!seller && !market && !administrator) return;

  if (seller) return seller;

  if (administrator) return administrator;

  if (market) return market;
};
