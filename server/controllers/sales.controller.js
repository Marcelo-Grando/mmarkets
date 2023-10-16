import { pool } from "../db.js";

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

    const [[{ email, market_name, seller_id }]] = await pool.query(
      "SELECT s.seller_id, s.email, m.market AS market_name FROM sellers s INNER JOIN markets m ON s.market = m.market_id WHERE seller_id = ?",
      [seller]
    );

    const amount = products
      .map((p) => p.price * p.quantify)
      .reduce((acumulador, valorActual) => acumulador + valorActual);

    const [sale] = await pool.query(
      "INSERT INTO sales (market, seller, amount, date, time) VALUES (?,?,?,DATE(NOW()),TIME(NOW()))",
      [market, seller, amount]
    );


    const [[{date, time}]] = await pool.query("SELECT SUBSTRING(date, 1,10) AS date, time FROM sales WHERE sale_id = LAST_INSERT_ID()")


    console.log(date, time)

    products.map(
      async (product) =>
        await pool.query(
          "INSERT INTO products_x_sales (product, sale, quantify) VALUES (?,?,?)",
          [product.product_id, sale.insertId, product.quantify]
        )
    );

    res.json({
      ticket_id: sale.insertId,
      market_name,
      seller_email: email,
      seller_id,
      products: JSON.stringify(products),
      date,
      time,
      amount,
      market,
    });
  } catch (error) {
    console.log(error);
  }
};

export const createTicket = async (req, res) => {
  try {
    const {
      ticket_id,
      products,
      amount,
      date,
      time,
      seller_email,
      market,
      market_name,
      seller_id
    } = req.body;
    const [response] = await pool.query(
      "INSERT INTO tickets_sales (ticket_id, products, amount, date, time, seller, market_id, market) VALUES (?,?,?,?,?,?,?,?)",
      [ticket_id, products, amount, date, time, seller_email, market, market_name]
    );
    const sold_products = JSON.parse(products)
    sold_products.forEach(async product => {
      await pool.query('INSERT INTO sold_products (product_id, name, description, category, price, quantify, ticket_id, market_id, seller_id) VALUES (?,?,?,?,?,?,?,?,?)', [product.product_id, product.product, product.description, product.category, product.price, product.quantify, ticket_id, market, seller_id])
    })
    res.status(204).json({ message: "Ticked insert successfully" });
  } catch (error) {
    console.log(error);
  }
};