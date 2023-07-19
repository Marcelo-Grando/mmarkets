import { pool } from "../db.js";
import { years , month, date, time, hour } from "../functions/dates.js"


export const getSales = async (req, res) => {
  try {
    const market = req.params.market;
    const [rows] = await pool.query("SELECT * FROM sales WHERE market = ?", [
      market,
    ]);
    res.send(rows);
  } catch (error) {
    console.log(error);
  }
};

export const createSale = async (req, res) => {
  try {
    const { market, seller } = req.params;
    const products = req.body;
    console.log(products)
    let amount = 0;
    let articles = [];
    const [sale] = await pool.query(
      "INSERT INTO sales (market, seller, month, amount, date, time, year, hour) VALUES (?,?,?,0, ?, ?, ?, ?)",
      [market, seller, month, date, time, years, hour]
    );
    for (let i = 0; i < products.length; i++) {
      let { product_id, quantify } = products[i];
      const [rows] = await pool.query(
        "SELECT * FROM products WHERE product_id = ?",
        [product_id]
      );
      amount = Number(amount) + Number(rows[0].price) * quantify;
      await pool.query(
        "INSERT INTO products_x_sales (product,sale,quantify) VALUES(?,?,?)",
        [rows[0].product_id, sale.insertId, quantify]
      );
      articles.push({
        product: rows[0].product,
        quantify,
        price: rows[0].price * quantify,
      });
    }
    await pool.query("UPDATE sales SET amount = ? WHERE sale_id = ?", [
      amount,
      sale.insertId,
    ]);
    res.send({
      market,
      seller,
      articles,
      date,
      time,
      amount,
    });
  } catch (error) {
    console.log(error);
  }
};