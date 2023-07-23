import { pool } from "../db.js";
import { year, month, date, time, hour } from "../functions/dates.js";

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

    const amount = products
      .map((p) => p.price * p.quantify)
      .reduce((acumulador, valorActual) => acumulador + valorActual);

    const [sale] = await pool.query(
      "INSERT INTO sales (market, seller, amount, year, month, date, time, hour) VALUES (?,?,?,?,?,?,?,?)",
      [market, seller, amount, year, month, date, time, hour]
    );

    for (let i = 0; i < products.length; i++) {
      await pool.query(
        "INSERT INTO products_x_sales (product, sale, quantify) VALUES (?,?,?)",
        [products[i].product_id, sale.insertId, products[i].quantify]
      );
    }

    res.json({
      ticket_id: sale.insertId,
      market,
      seller,
      products,
      date,
      time,
      amount,
    });
  } catch (error) {
    console.log(error);
  }
};
