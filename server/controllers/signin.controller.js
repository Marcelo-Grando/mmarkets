import { pool } from "../db.js";
import jwt from "jsonwebtoken";
import { verifyUser } from "../middlewares/verify.signin.js";

export const signin = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await verifyUser(email);

    if (!user) {
      return res.status(404).send("The email doesn't exits");
    }

    const a = user.password.toString();

    const validation = a === password;

    if (!validation) {
      return res.status(401).json({ auth: false, token: null });
    }

    const token = jwt.sign({ id: user.id }, "secret", {
      expiresIn: 60 * 60 * 8,
    });

    return res.json({ ...user, auth: true, token });
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
