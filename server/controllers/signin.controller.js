import { pool } from "../db.js";
import jwt from "jsonwebtoken";

export const signin = async (req, res, next) => {
    try {
      const { email, password } = req.body;
  
      const [[user]] = await pool.query("SELECT * FROM sellers WHERE email = ?", [
        email,
      ]);
  
      if (!user) {
        return res.status(404).send("The email doesn't exits");
      }
  
      const [[{ user_password }]] = await pool.query(
        "SELECT s.seller_id, s.email as user_email, s.password as user_password FROM sellers s WHERE email = ?",
        [email]
      );
  
      const a = user_password.toString();
  
      const validation = a === password;
  
      if (!validation) {
        return res.status(401).json({ auth: false, token: null });
      }
  
      const token = jwt.sign({ id: user.seller_id }, "secret", {
        expiresIn: 60 * 60 * 8,
      });
  
      res.json({ auth: true, token, seller_id: user.seller_id, market: user.market });
    } catch (error) {
      res.console.error(error);
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