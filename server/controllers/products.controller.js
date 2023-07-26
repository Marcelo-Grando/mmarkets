import { pool } from "../db.js";

const allProducts = "SELECT * FROM products p WHERE market = ? ORDER BY p.product ASC"

export const getProducts = async (req, res) => {
  try {
    const {market} = req.params;
    const [rows] = await pool.query(allProducts, [
      market,
    ]);
    res.send(rows);
  } catch (error) {
    console.log(error);
  }
};

export const getProduct = async (req, res) => {
  try {
    const { market, product } = req.params;
    const [rows] = await pool.query(
      "SELECT * FROM products WHERE product_id = ? AND market = ?",
      [product, market]
    );
    res.json(rows[0]);
  } catch (error) {
    console.log(error);
  }
};

export const getProductByName = async (req, res) => {
  try {
    const { market, product } = req.params;
    const [rows] = await pool.query(
      "SELECT * FROM products WHERE product LIKE ? AND market = ? ORDER BY product ASC",
      [`${product}%`, market]
    );
    res.json(rows);
  } catch (error) {
    console.log(error);
  }
};

export const createProduct = async (req, res) => {
  try {
    const {market} = req.params;
    const { product, description, category, price } = req.body;

    const [[{category_id}]] = await pool.query("SELECT c.category_id FROM categories c WHERE  c.category = ?", [category])
    
    const [result] = await pool.query(
      "INSERT INTO products (product, description, category, market, price) VALUES (?,?,?,?,?)",
      [product, description, category_id, market, price]
    );
    res.send({
      product_id: result.insertId,
      product,
      description,
      category,
      market,
      price,
    });
  } catch (error) {
    console.log(error);
  }
};

export const updateProduct = async (req, res) => {
  try {
    const { product_id, market } = req.params;
    const { product, description, category, price } = req.body;
    const [result] = await pool.query(
      "UPDATE products SET product = IFNULL(?, product), description = IFNULL(?, description), category = IFNULL(?, category), market = IFNULL(?, market), price = IFNULL(?, price) WHERE product_id = ?",
      [product, description, category, market, price, product_id]
    );
    const [rows] = await pool.query(
      "SELECT * FROM products WHERE product_id = ? AND market = ?",
      [product_id, market]
    );
    res.json(rows[0]);
  } catch (error) {
    console.log(error);
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const {market, product} = req.params;
    const [result] = await pool.query(
      "DELETE FROM products WHERE product_id = ? AND market = ?",
      [product, market]
    );
    res.sendStatus(204);
  } catch (error) {
    console.log(error);
  }
};
