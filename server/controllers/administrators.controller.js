import { pool } from "../db.js";

export const createAdministrator = async (req, res) => {
  try {
    const { market } = req.params;
    const { name, lastname, dni, email, password } = req.body;

    const SECRET = process.env.SECRET;

    if (!name || !lastname || !dni || !email || !password)
      return res.status(400).json({ message: "Complete all fields" });

    const [response] = await pool.query("INSERT INTO usersTest (email, password, roles, main_account) VALUES (?, AES_ENCRYPT(?, ?), ?, ?)", [email, password, SECRET, 'administrator', market])

    const [insertAdministratorData] = await pool.query("INSERT INTO administrators2 (administrator_id, name, lastname, dni, email, position, market_id) VALUES (?, ?, ?, ?, ?, ?, ?)", [response.insertId, name, lastname, dni, email, 'administrator', market])

    res.send({
      seller_id: response.insertId,
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
      "SELECT market_id, administrator_id, name, lastname, dni, email FROM administrators2 WHERE market_id = ?",
      [market]
    );
    res.send(rows);
  } catch (error) {
    console.log(error);
  }
};

export const getAdministrator = async (req, res) => {
  try {
    const { market, administrator_id } = req.params;

    const [[administrator]] = await pool.query(
      "SELECT market_id, administrator_id, name, lastname, dni, email, position FROM administrators2 WHERE administrator_id = ? AND market_id = ?",
      [administrator_id, market]
    );
    res.json(administrator);
  } catch (error) {
    console.log(error);
  }
};

export const deleteAdministrator = async (req, res) => {
  try {
    console.log("llego params: ", req.params);
    const { administrator_id, market } = req.params;
    const [result] = await pool.query(
      "DELETE FROM administrators2 WHERE administrator_id = ? AND market_id = ?",
      [administrator_id, market]
    );
    res.send("Administrator Deleted");
  } catch (error) {
    console.log(error);
  }
};
