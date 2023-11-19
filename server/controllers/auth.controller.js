import { pool } from "../db.js";
import { findUser } from "../middlewares/verify.signin.js";
import { createUser } from "./users.controller.js";


export const createMarket = async (req, res) => {

  console.log(req.body)

  const {market_id, name, adress, state, position, email } = req.body

  const [response] = await pool.query("INSERT INTO markettest (market_id, name, adress, state, position, email) VALUES (?, ?, ?, ?, ?, ?)", [market_id, name, adress, state, position, email])

  res.json({message: "Market created"})
}

export const createAccount = async (req, res) => {
  const SECRET = process.env.SECRET;

  const { market, adress, email, password } = req.body;

  if (!market || !email || !adress || !password)
    return res.status(401).json({ message: "faltan datos" });

  const [[foundEmail]] = await pool.query(
    "SELECT email FROM markets m WHERE m.email = ?",
    [email]
  );

  if (foundEmail)
    return res.status(401).json({ message: "The email is already exist" });

  const [response] = await pool.query("INSERT INTO usersTest (email, password, roles) VALUES (?, AES_ENCRYPT(?, ?), ?)", [email, password, SECRET, 'main-account'])

  const [insertMarketData] = await pool.query("INSERT INTO markettest (market_id, name, adress, state, position, email) VALUES (?, ?, ?, ?, ?, ?)", [response.insertId, market, adress, true, "main-account", email])

  res.json({
    id: result.insertId,
    market,
    email,
    adress,
  });
};

export const signin = async (req, res) => {
  try {
    const { email } = req.body;

    console.log('probando en signin', req.validate_user)

    const [[{ user_email, user_id, roles}]] = await pool.query("SELECT email AS user_email, user_id, roles from userstest WHERE email = ?", [email])

    if(!user_id) return res.status(404).json({message: "User not found"})

    req.session.user = user_email;

    res.json({auth: true, user_email, user_id, roles});
  } catch (error) {
    console.log("error", error);
  }
};

export const signout = async (req, res) => {
  req.session.destroy();
  res.json({ message: "Session ended successfully" });
};
