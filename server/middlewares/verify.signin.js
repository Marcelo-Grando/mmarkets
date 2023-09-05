import { pool } from "../db.js";

export const verifySession = async (req, res, next) => {
  try {
    const [[response]] = await pool.query(
      "SELECT * FROM sessions WHERE session_id = ?",
      [req.session.id]
    );
    if (!response) {
      req.redirect = true;
      return res.status(401).json({ message: "The user doesn't have an active session" });
    }
    const session_cookie = JSON.parse(response.data);
    console.log(!session_cookie.user)
    if (!session_cookie.user)
      return res.status(401).json({ message: "The user doesn't have an active session" });
 
    next();
  } catch (error) {
    console.log(error);
  }
};

export const comparePassword = async (dni, user_id, user_password) => {

  const SECRET = process.env.SECRET

  console.log('dni', dni, 'user_id', user_id, 'password', user_password)

  const [[seller_password]] = await pool.query(
    "SELECT AES_DECRYPT(password, ?) AS value FROM sellers WHERE seller_id = ?",
    [dni, user_id]
  );
  const [[market_password]] = await pool.query(
    "SELECT AES_DECRYPT(password, ?) AS value FROM markets WHERE market_id = ?",
    [SECRET, user_id]
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

export const findUser = async (email) => {
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
