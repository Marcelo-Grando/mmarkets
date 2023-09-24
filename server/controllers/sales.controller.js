import { pool } from "../db.js";
import { year, month, date, time, hour } from "../functions/dates.js";

export const getSales = async (req, res) => {
  try {
    const { market } = req.params;

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

    const [[{ email }]] = await pool.query(
      "SELECT * FROM sellers WHERE seller_id = ?",
      [seller]
    );

    const amount = products
      .map((p) => p.price * p.quantify)
      .reduce((acumulador, valorActual) => acumulador + valorActual);

    const [sale] = await pool.query(
      "INSERT INTO sales (market, seller, amount, year, month, date, time, hour) VALUES (?,?,?,?,?,?,?,?)",
      [market, seller, amount, year, month, date, time, hour]
    );

    products.map(
      async (product) =>
        await pool.query(
          "INSERT INTO products_x_sales (product, sale, quantify) VALUES (?,?,?)",
          [product.product_id, sale.insertId, product.quantify]
        )
    );

    res.json({
      ticket_id: sale.insertId,
      market,
      seller_email: email,
      products,
      date,
      time,
      amount,
    });
  } catch (error) {
    console.log(error);
  }
};
