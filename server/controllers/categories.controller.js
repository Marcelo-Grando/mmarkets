import { pool } from "../db.js";

export const getCategories = async (req, res) => {
  try {
    const { market } = req.params;
    const [rows] = await pool.query(
      "SELECT * FROM categories WHERE market = ?",
      [market]
    );
    res.send(rows);
  } catch (error) {
    res.send(error);
  }
};

export const getCategory = async (req, res) => {
  try {
    const { market, category } = req.params;
    const [rows] = await pool.query(
      "SELECT * FROM categories WHERE market = ? AND category_id = ?",
      [market, category]
    );
    res.json(rows[0]);
  } catch (error) {
    console.log(error);
  }
};

export const createCategory = async (req, res) => {
  try {
    const { market } = req.params;
    const { category } = req.body;
    const [response] = await pool.query(
      "INSERT INTO categories (category,market) VALUES (?,?)",
      [category, market]
    );
    res.send({
      id: response.insertId,
      category,
    });
  } catch (error) {
    res.send(error);
  }
};

export const updateCategory = async (req, res) => {
  try {
    const { market, category_id } = req.params;
    const { category } = req.body;
    const [result] = await pool.query(
      "UPDATE categories SET category = ? WHERE category_id = ? AND market = ?",
      [category, category_id, market]
    );
    const [rows] = await pool.query(
      "SELECT * FROM categories WHERE category_id = ?",
      [category_id]
    );
    res.json(rows[0]);
  } catch (error) {
    res.send(error);
  }
};

export const deleteCategory = async (req, res) => {
  try {
    const { market, category } = req.params;
    console.log(req.params)
    const [result] = await pool.query(
      "DELETE FROM categories WHERE category_id = ? AND market = ?",
      [category, market]
    );
    res.sendStatus(204);
  } catch (error) {
    res.send(error);
  }
};
