import { pool } from "../db.js";
import { date } from "../functions/dates.js";

export const salesTotal = async (req, res) => {
  try {
    const market = req.params.market;
    const [result] = await pool.query(
      "SELECT SUM(amount) AS total_sales FROM sales WHERE market = ?",
      [market]
    );
    res.send(result[0]);
  } catch (error) {
    console.log(error);
  }
};

export const salesByCategories = async (req, res) => {
  try {
    const market = req.params.market;
    const [result] = await pool.query(
      "SELECT SUM(amount) AS total_sales FROM sales WHERE market = ?",
      [market]
    );
    const total_sales = result[0].total_sales;
    const [rows] = await pool.query(
      "SELECT p.market, p.category, c.category_id, c.category, SUM(quantify) AS quantify, SUM(px.quantify*p.price) AS amount, (SUM(px.quantify*p.price)/?) * 100 AS percentage FROM products_x_sales px INNER JOIN products p ON px.product = p.product_id INNER JOIN categories c ON p.category = c.category_id WHERE p.market = ? GROUP BY p.category",
      [total_sales, market]
    );
    res.send(rows);
  } catch (error) {
    console.log(error);
  }
};

export const salesByProducts = async (req, res) => {
  try {
    const market = req.params.market;
    const [result] = await pool.query(
      "SELECT SUM(amount) AS total_sales FROM sales WHERE market = ?",
      [market]
    );
    const total_sales = result[0].total_sales;
    const [rows] = await pool.query(
      "SELECT p.market, p.product_id, p.product, p.description, sum(px.quantify) AS quantify, sum(p.price*px.quantify) AS amount,(SUM(px.quantify*p.price)/?) * 100 AS percentage FROM products p INNER JOIN products_x_sales px ON p.product_id = px.product WHERE p.market = ? GROUP BY p.product_id",
      [total_sales,market]
    );
    res.send(rows);
  } catch (error) {
    console.log(error);
  }
};

export const salesBySellers = async (req, res) => {
  try {
    const market = req.params.market;
    const [rows] = await pool.query(
      "SELECT sr.market, s.seller, sr.name, sr.lastname, SUM(s.amount) AS total_sold FROM sales s INNER JOIN sellers sr ON s.seller = sr.seller_id WHERE sr.market = ? GROUP BY s.seller",
      [market]
    );
    res.send(rows);
  } catch (error) {
    console.log(error);
  }
};

// export const salesByDay = async (req, res) => {
//   try {
//     const day = req.body.day ? req.body.day : date;
//     console.log(day)
//     const market = req.params.market;
//     const [result] = await pool.query(
//       "SELECT SUM(amount) AS 'total_sales' FROM sales WHERE market = ? AND date = ?",
//       [market, day]
//     );
//     if (!result[0].total_sales)
//       return res.send("There are no sales on the indicated day");
//     res.send(result[0]);
//   } catch (error) {
//     console.log(error);
//   }
// };

export const salesByDay = async (req, res) => {
  const market = req.params.market
  const [rows] = await pool.query('SELECT s.date, SUM(amount) AS amount FROM sales s WHERE market = ? GROUP BY date', [market])
  res.send(rows)
} 

export const salesByMonth = async (req, res) => {
  const market = req.params.market
  const [rows] = await pool.query('SELECT month, SUM(amount) AS total_sales FROM sales WHERE market = ? GROUP BY month', [market])
  res.send(rows)
}

export const salesByYear = async (req, res) => {
  const market = req.params.market
  const [rows] = await pool.query('SELECT year, SUM(amount) AS total_sales FROM sales WHERE market = ? GROUP BY year', [market])
  res.send(rows)
}
