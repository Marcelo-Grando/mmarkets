import { pool } from "../db.js";
import { findUser } from "../middlewares/verify.signin.js";

export const createAccount = async (req, res) => {
  const SECRET = process.env.SECRET;

  const { market, adress, email, password } = req.body;

  if (!market || !email || !adress || !password)
    return res.status(401).json({ message: "faltan datos" });    

    //crear middleware que compruebe existencia de cuentas 
  const [[foundEmail]] = await pool.query(
    "SELECT email FROM markets m WHERE m.email = ?",
    [email]
  );

  if (foundEmail)
    return res.status(401).json({ message: "The email is already exist" });
  const [result] = await pool.query(
    "INSERT INTO markets (market,adress,email,password,position) VALUES (?,?,?,AES_ENCRYPT(?, ?),'main-account')",
    [market, adress, email, password, SECRET]
  );

  const [insertUser] = await pool.query(
    "INSERT INTO users (user_id, email, password, rol, market_id) VALUES (?, ?, AES_ENCRYPT(?, ?), ?, ?)",
    [result.insertId, email, password, SECRET, "[main-account]", result.insertId]
  );

  res.send({
    id: result.insertId,
    market,
    email,
    adress,
  });
};

export const signin = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await findUser(email)

    req.session.user = email

    res.json(user);
  } catch (error) {
    console.log("error", error);
  }
};

export const signout = async (req, res) => {
  req.session.destroy();
  res.json({ message: "Session ended successfully" });
};
