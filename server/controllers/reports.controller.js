import { pool } from "../db.js";

export const getTickets = async (req, res) => {
  try {
    const { market } = req.params;

    const [tickets] = await pool.query(
      "SELECT ticket_id, products, amount, SUBSTRING(date, 1, 10) AS date, time, seller, market_id, market FROM tickets_sales WHERE market_id = ? ORDER BY ticket_id DESC",
      [market]
    );
    //console.log(tickets)
    tickets.forEach(ticket => ticket.products = JSON.parse(ticket.products))

    res.send(tickets);
  } catch (error) {
    console.log(error);
  }
};

export const salesTotal = async (req, res) => {
  try {
    const { market } = req.params;

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
    const { market } = req.params;

    const [response] = await pool.query(
      "SELECT category, SUM(price * quantify) AS amount FROM sold_producttest WHERE market_id = ? GROUP BY category",
      [market]
    );

    res.json(response);
  } catch (error) {
    console.log(error);
  }
};

export const statisticsProducts = async (req, res) => {
  try {
    const { market } = req.params;

    const [[{ total_quantify }]] = await pool.query(
      "SELECT SUM(quantify) AS total_quantify FROM sold_products WHERE market_id = ?",
      [market]
    );

    console.log(total_quantify);

    const [products] = await pool.query(
      "SELECT name, SUM(quantify) as quantify from sold_products WHERE market_id = ? GROUP BY name",
      [market]
    );

    res.json(products);
  } catch (error) {
    console.log(error);
  }
};

export const salesByProducts = async (req, res) => {
  try {
    const { market } = req.params;

    const [rows] = await pool.query(
      "SELECT product_id, name as product, description, sum(quantify) as quantify, SUM(price * quantify) AS amount FROM sold_producttest WHERE market_id = ? GROUP BY product_id, name, description ORDER BY quantify DESC",
      [market]
    );

    res.json(rows);
  } catch (error) {
    console.log(error);
  }
};

export const salesBySellers = async (req, res) => {
  try {
    const { market } = req.params;

    const [rows] = await pool.query(
      "SELECT t.market_id, s.name, s.lastname, s.email, SUM(amount) AS total_sold FROM tickets_sales t INNER JOIN sellerstest s ON t.seller = s.email WHERE t.market_id = ? GROUP BY s.name, s.lastname, s.email, t.market_id",
      [market]
    );
    res.send(rows);
  } catch (error) {
    console.log(error);
  }
};

export const salesByDay = async (req, res) => {
  const { market } = req.params;

  const [rows] = await pool.query(
    "SELECT SUBSTRING(date, 1, 10) AS date, SUM(amount) AS amount FROM tickets_sales WHERE market_id = ? GROUP BY date",
    [market]
  );

  res.send(rows);
};

export const salesByMonth = async (req, res) => {
  const { market } = req.params;

  const [rows] = await pool.query("SELECT ", [market]);
  res.send(rows);
};

export const salesByYear = async (req, res) => {
  const { market } = req.params;

  const [rows] = await pool.query(
    "SELECT year, SUM(amount) AS total_sales FROM sales WHERE market = ? GROUP BY year",
    [market]
  );
  res.send(rows);
};
