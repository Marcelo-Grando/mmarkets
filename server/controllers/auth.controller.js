import { pool } from "../db.js";

export const signIn = async (req, res, next) => {};

export const createAccount = async (req, res) => {
  const { market, adress, email, password } = req.body;
  const [[foundEmail]] = await pool.query(
    "SELECT email FROM markets m WHERE m.email = ?",
    [email]
  );
  if (foundEmail) return res.send("The email is already exist");
  const [rows] = await pool.query(
    "INSERT INTO markets (market,adress,email,password,position) VALUES (?,?,?,AES_ENCRYPT(?, 'secret'),'main-account')",
    [market, adress, email, password]
  );
  res.send({
    id: rows.insertId,
    market,
    email,
    adress,
  });
};

export const createSeller = async (req, res, next) => {};

export const createAdministrator = async (req, res, next) => {};
