import { pool } from "../db.js";

export const getMarkets = async (req, res) => {
  const [rows] = await pool.query("SELECT market, adress, email FROM markets");
  console.log(year)
  res.json(rows);
};

export const loginMarket = async (req, res) => {
  const { email, password } = req.body;
  const [rows] = await pool.query("SELECT * FROM markets WHERE email = ?", [
    email,
  ]);

  res.send(rows[0]);
};

export const createMarket = async (req, res) => {
  const { market, email, adress, password } = req.body;
  const [rows] = await pool.query(
    "INSERT INTO markets (market,email,adress,password,position) VALUES (?,?,?,?,'main-account')",
    [market, email, adress, password]
  );
  res.send({
    id: rows.insertId,
    market,
    email,
    adress,
  });
};

export const updateMarket = (req, res) => {
  res.send("actualizando cuenta");
};

export const redirecciona = (req, res, next) => {
 
}

export const deleteMarket = (req, res) => {
  res.send("Eliminado cuenta");
};
