import { pool } from "../db.js";

export const createAdministrator = async (req, res) => {
    try {
      const { market } = req.params;
      const { name, lastname, dni, email, password } = req.body;
      if (!name || !lastname || !dni || !email || !password)
        return res.status(400).json({ message: "Complete all fields" });
      const [result] = await pool.query(
        "INSERT INTO administrators (name,lastname,dni,email,password, position, market) VALUES (?,?,?,?,?,'administrator',?)",
        [name, lastname, dni, email, password, market]
      );
  
      // const token = jwt.sign({ id: result.insertId }, "secret", {
      //   expiresIn: 60 * 60 * 8,
      // });
  
      res.send({
        seller_id: result.insertId,
        name,
        lastname,
        dni,
        email,
        market,
        auth: true,
        token,
      });
    } catch (error) {
      console.log(error);
    }
  };

  export const getAdministrators = async (req, res) => {
    try {
        const { market } = req.params;
        console.log(req.params);
        const [rows] = await pool.query(
          "SELECT market, administrator_id, name, lastname, dni, email FROM administrators WHERE market = ?",
          [market]
        );
        console.log(rows);
        res.send(rows);
      } catch (error) {
        console.log(error);
      }
  }