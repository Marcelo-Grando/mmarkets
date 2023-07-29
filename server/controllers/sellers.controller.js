import { pool } from "../db.js";
import jwt from "jsonwebtoken";

export const profile = async (req, res, next) => {
  try {
    const token = req.headers["x-access-token"];
    if (!token) {
      return res.status(401).json({
        auth: false,
        message: "No token provided",
      });
    }

    const decoded = jwt.verify(token, "secret");

    const [[user]] = await pool.query(
      "SELECT seller_id, name, lastname, dni, email, market FROM sellers where seller_id = ?",
      [decoded.id]
    );
    if (!user) {
      return res.status(404).send("No user found");
    }

    res.json(user);
  } catch (error) {
    res.send(error);
  }
};

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
    const [result] = await pool.query(
      "INSERT INTO sellers (name,lastname,dni,email,password,market) VALUES (?,?,?,?,?,?)",
      [name, lastname, dni, email, password, market]
    );

    console.log(result);

    const token = jwt.sign({ id: result.insertId }, "secret", {
      expiresIn: 60 * 60 * 8,
    });

    res.send({
      seller_id: result.insertId,
      name,
      lastname,
      dni,
      email,
      market,
      auth: true,
      token,
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
    res.send("Seller Deleted");
  } catch (error) {
    console.log(error);
  }
};
