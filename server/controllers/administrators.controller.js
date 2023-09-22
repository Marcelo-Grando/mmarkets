import { pool } from "../db.js";

export const createAdministrator = async (req, res) => {
  try {
    const { market } = req.params;
    const { name, lastname, dni, email, password } = req.body;
    if (!name || !lastname || !dni || !email || !password)
      return res.status(400).json({ message: "Complete all fields" });
    const [result] = await pool.query(
      "INSERT INTO administrators (name,lastname,dni,email,password, position, market) VALUES (?,?,?,?,AES_ENCRYPT(?, ?),'administrator',?)",
      [name, lastname, dni, email, password, dni, market]
    );

    res.send({
      seller_id: result.insertId,
      name,
      lastname,
      dni,
      email,
      market,
      auth: true,
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
    console.log('admin: ', rows)
    res.send(rows);
  } catch (error) {
    console.log(error);
  }
};

export const getAdministrator = async (req, res) => {
  try {
    const { market, administrator_id } = req.params;
    console.log("ad", administrator_id);
    const [rows] = await pool.query(
      "SELECT market, administrator_id, name, lastname, dni, email, position FROM administrators WHERE administrator_id = ? AND market = ?",
      [administrator_id, market]
    );
    if (rows[0].email !== req.session.user)
      return res
        .status(401)
        .json({ message: "The user doesn't have an active session" });
    console.log(rows);
    res.send(rows[0]);
  } catch (error) {
    console.log(error);
  }
};
