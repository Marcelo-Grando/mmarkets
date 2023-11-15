import { pool } from "../db.js";

export const getSales = async (req, res) => {
  try {
    const { market } = req.params;

    const [rows] = await pool.query(
      "SELECT * FROM salestest WHERE market_id = ?",
      [market]
    );
    res.send(rows);
  } catch (error) {
    console.log(error);
  }
};

export const createTicket = async (
  ticket_id,
  products,
  amount,
  date,
  time,
  seller_email,
  market,
  market_name,
  seller_id
) => {
  try {
    const [response] = await pool.query(
      "INSERT INTO tickets_sales (ticket_id, products, amount, date, time, seller, market_id, market) VALUES (?,?,?,?,?,?,?,?)",
      [
        ticket_id,
        products,
        amount,
        date,
        time,
        seller_email,
        market,
        market_name,
      ]
    );
    const sold_products = JSON.parse(products);

    sold_products.forEach(async (product) => {
      await pool.query(
        "INSERT INTO sold_producttest (product_id, name, description, category, price, quantify, ticket_id, market_id, seller_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
        [
          product.product_id,
          product.product,
          product.description,
          product.category,
          product.price,
          product.quantify,
          ticket_id,
          market,
          seller_id,
        ]
      );
    });
  } catch (error) {
    console.log(error);
  }
};

export const createSale = async (req, res) => {
  try {
    const { market, seller } = req.params;
    const products = req.body;

    const [[{ email, market_name, seller_id }]] = await pool.query(
      "SELECT s.seller_id, s.email, m.name AS market_name FROM sellerstest s INNER JOIN markettest m ON s.market_id = m.market_id WHERE seller_id = ?",
      [seller]
    );

    const amount = products
      .map((p) => p.price * p.quantify)
      .reduce((acumulador, valorActual) => acumulador + valorActual);

    const [sale] = await pool.query(
      "INSERT INTO salestest (market_id, seller_id, amount, date, time) VALUES (?,?,?,DATE(NOW()),TIME(NOW()))",
      [market, seller, amount]
    );

    const [[{ date, time }]] = await pool.query(
      "SELECT SUBSTRING(date, 1,10) AS date, time FROM salestest WHERE sale_id = ?",
      [sale.insertId]
    );

    products.map(
      async (product) =>
        await pool.query(
          "INSERT INTO products_x_salestest (product_id, sale_id, quantify) VALUES (?,?,?)",
          [product.product_id, sale.insertId, product.quantify]
        )
    );

    const sold_products = JSON.stringify(products);

    createTicket(
      sale.insertId,
      sold_products,
      amount,
      date,
      time,
      email,
      market,
      market_name,
      seller_id
    );

    res.json({
      ticket_id: sale.insertId,
      market_name,
      seller_email: email,
      seller_id,
      products: sold_products,
      date,
      time,
      amount,
      market,
    });
  } catch (error) {
    console.log(error);
  }
};
