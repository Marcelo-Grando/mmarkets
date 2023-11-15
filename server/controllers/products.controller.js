import { pool } from "../db.js";

const allProducts =
  "SELECT * FROM productstest p INNER JOIN categoriestest c ON p.category_id = c.category_id WHERE p.market_id = ? ORDER BY c.category ASC";

export const getProducts = async (req, res) => {
  try {
    const { market } = req.params;
    const [products] = await pool.query(allProducts, [market]);
    console.log(products);
    res.json(products);
  } catch (error) {
    console.log(error);
  }
};

export const getProduct = async (req, res) => {
  try {
    const { market, product } = req.params;
    const [rows] = await pool.query(
      "SELECT * FROM productstest WHERE product_id = ? AND market_id = ?",
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
    const [products] = await pool.query(
      "SELECT p.product_id, p.product, p.description, p.price, c.category FROM productstest p INNER JOIN categoriestest c ON p.category_id = c.category_id WHERE p.product LIKE ? || c.category LIKE ? AND p.market_id = ? ORDER BY product ASC",
      [`${product}%`, `${product}%`, market]
    );
    if (!products.length)
      return res.status(404).json({ message: "Product is not exist" });
    res.json(products);
  } catch (error) {
    console.log(error);
  }
};

export const createProduct = async (req, res) => {
  try {
    const { market } = req.params;
    const { product, description, category, price } = req.body;

    if (!product || !description || !category || !price)
      return res.status(400).json({ message: "Complete all fields" });

    if (isNaN(parseInt(price)))
      return res.status(400).json({ message: "The price must be a number" });

    const [foundProduct] = await pool.query(
      "SELECT * FROM productstest p WHERE p.product = ? AND p.description = ? AND p.market_id = ?",
      [product, description, market]
    );

    if (foundProduct.length)
      return res.status(400).json({ message: "The product already exists" });

    const [[{ category_id }]] = await pool.query(
      "SELECT c.category_id FROM categoriestest c WHERE  c.category = ?",
      [category]
    );

    const [result] = await pool.query(
      "INSERT INTO productstest (product, description, category_id, market_id, price) VALUES (?,?,?,?,?)",
      [product, description, category_id, market, price]
    );
    res.status(201).json({
      message: "Product created successfully",
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
    const { market, product } = req.params;
    const [result] = await pool.query(
      "DELETE FROM productstest WHERE product_id = ? AND market_id = ?",
      [product, market]
    );
    res.status(204).json({ message: "Product deleted successfully" });
  } catch (error) {
    console.log(error);
  }
};
