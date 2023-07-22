import { pool } from "../db.js";

export const getSellers = async (req, res) => {
  try {
    const { market } = req.params;
    const [rows] = await pool.query(
      "SELECT market, seller_id, name, lastname, dni, email FROM sellers WHERE market = ?",
      [market]
    );
    res.send(rows);
  } catch (error) {
    console.log(error);
  }
};

export const getSeller = async (req, res) => {
  try {
    const { market, seller } = req.params;
    const [rows] = await pool.query(
      "SELECT market, name, lastname, dni, email FROM sellers WHERE seller_id = ? AND market = ?",
      [seller, market]
    );
    res.json(rows[0]);
  } catch (error) {
    console.log(error);
  }
};

export const createSeller = async (req, res) => {
  try {
    const { market } = req.params;
    const { name, lastname, dni, email, password } = req.body;
    const [rows] = await pool.query(
      "INSERT INTO sellers (name,lastname,dni,email,password,market) VALUES (?,?,?,?,?,?)",
      [name, lastname, dni, email, password, market]
    );
    res.send({
      seller_id: rows.insertId,
      name,
      lastname,
      dni,
      email,
      market,
    });
  } catch (error) {
    console.log(error);
  }
};

export const updateSeller = async (req, res) => {
  try {
    const { market, seller } = req.params;
    const { name, lastname, dni, email, password } = req.body;
    const [result] = await pool.query(
      "UPDATE sellers SET name = IFNULL(?, name), lastname = IFNULL(?, lastname), dni = IFNULL(?, dni), email = IFNULL(?, email), password = IFNULL(?, password) WHERE seller_id = ? AND market = ?",
      [name, lastname, dni, email, password, seller, market]
    );
    const [rows] = await pool.query(
      "SELECT * FROM sellers WHERE seller_id = ? AND market = ?",
      [seller, market]
    );
    res.json(rows[0]);
  } catch (error) {
    console.log(error);
  }
};

export const deleteSeller = async (req, res) => {
  try {
    const { market, seller } = req.params;
    const [result] = await pool.query(
      "DELETE FROM sellers WHERE seller_id = ? AND market = ?",
      [seller, market]
    );
    res.send('Seller Deleted')
  } catch (error) {
    console.log(error);
  }
};
