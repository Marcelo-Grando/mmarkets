import { pool } from "../db.js";

export const getProducts = async (req, res) => {
  try {
    const {market} = req.params;
    const [rows] = await pool.query("SELECT * FROM products WHERE market = ?", [
      market,
    ]);
    res.send(rows);
  } catch (error) {
    console.log(error);
  }
};

export const getProductsForSale = async (req, res) => {
  const {market}= req.params
  const {pointer} =  req.body
  const [rows] = await pool.query("SELECT p.product_id, p.product, p.description, p.price FROM products p INNER JOIN categories c ON p.category = c.category_id WHERE p.product = ? OR c.category = ? AND p.market = ?", [pointer, pointer, market])
  res.send(rows)
}

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
      "SELECT * FROM products WHERE product = ? AND market = ?",
      [product, market]
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
    const findProduct = await pool.query('SELECT * FROM products WHERE product = ? AND description = ?', [product, description])
    if(findProduct[0].length > 0) return res.send('el producto ya existe')
    const findCategory = await pool.query("SELECT category_id FROM categories c WHERE c.category = ?", [category])
    if(findCategory[0].length === 0) return res.send(`La categoria ${category} no existe`)
    const [result] = await pool.query(
      "INSERT INTO products (product, description, category, market, price) VALUES (?,?,?,?,?)",
      [product, description, findCategory[0][0].category_id, market, price]
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
