import { pool } from "../db.js";
import jwt from "jsonwebtoken";

export const signin = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // const [[user]] = await pool.query("SELECT * FROM sellers WHERE email = ?", [
    //   email,
    // ]);

    const [[seller]] = await pool.query(
      "SELECT * FROM sellers WHERE email = ?",
      [email]
    );

    const [[market]] = await pool.query(
      "SELECT * FROM markets WHERE email = ?",
      [email]
    );

    const [[administrator]] = await pool.query(
      "SELECT * FROM administrators WHERE email = ?",
      [email]
    );

    if (!seller && !market && !administrator) {
      return res.status(404).send("The email doesn't exits");
    }

    if (seller) {
      const [[{ seller_password }]] = await pool.query(
        "SELECT s.seller_id, s.email as seller_email, s.password as seller_password FROM sellers s WHERE email = ?",
        [email]
      );
      const a = seller_password.toString();

      const validation = a === password;

      if (!validation) {
        return res.status(401).json({ auth: false, token: null });
      }

      const token = jwt.sign({ id: seller.seller_id }, "secret", {
        expiresIn: 60 * 60 * 8,
      });

      return res.json({ ...seller, auth: true, token });
    }

    if (administrator) {
      const [[{ administrator_password }]] = await pool.query(
        "SELECT a.administrator_id, a.email, a.password as administrator_password FROM administrators a WHERE email = ?",
        [email]
      );
      const a = administrator_password.toString();

      const validation = a === password;

      if (!validation) {
        return res.status(401).json({ auth: false, token: null });
      }

      const token = jwt.sign({ id: administrator.administrator_id }, "secret", {
        expiresIn: 60 * 60 * 8,
      });

      return res.json({ ...administrator, auth: true, token });
    }

    if (market) {
      const [[{ market_password }]] = await pool.query(
        "SELECT s.market_id, s.email as market_email, s.password as market_password FROM markets s WHERE email = ?",
        [email]
      );
      const a = market_password.toString();

      const validation = a === password;

      if (!validation) {
        return res.status(401).json({ auth: false, token: null });
      }

      const token = jwt.sign({ id: market.market_id }, "secret", {
        expiresIn: 60 * 60 * 8,
      });

      return res.json({ ...market, auth: true, token });
    }
  } catch (error) {
    console.error(error);
  }
};

export const getSellerByEmail = async (req, res) => {
  try {
    const { email } = req.params;

    const [rows] = await pool.query(
      "SELECT m.market, s.name, s.lastname, s.dni, s.email FROM sellers s INNER JOIN markets m ON s.market = m.market_id WHERE s.email = ?",
      [email]
    );
    res.json(rows[0]);
  } catch (error) {
    console.log(error);
  }
};
