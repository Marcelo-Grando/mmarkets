import { pool } from "../db.js";

export const getPxs = async (req, res) => {
  const [rows] = await pool.query("SELECT * FROM products_x_sales");
  res.send(rows);
};

export const createPxs = async (req, res) => {
  const { product, sale, quantify } = req.body;
  const [rows] = await pool.query(
    "INSERT INTO products_x_sales (product, sale, quantify ) VALUES (?,?,?)",
    [product, sale, quantify]
  );
  res.send({
    id: rows.insertId,
    product,
    sale,
    quantify,
  });
};
