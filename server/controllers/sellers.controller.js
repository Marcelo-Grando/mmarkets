import { pool } from "../db.js";

export const getSellers = async (req, res) => {
  try {
    const { market } = req.params;

    const [rows] = await pool.query(
      "SELECT market, seller_id, name, lastname, dni, email FROM sellers WHERE market = ?",
      [market]
    );
    res.send(rows);
  } catch (error) {
    console.log(error);
  }
};

export const getSeller = async (req, res) => {
  try {
    const { market, seller } = req.params;

    console.log('req seseion user',req.session.user)
   

    const [rows] = await pool.query(
      "SELECT market, name, lastname, dni, email, position FROM sellers WHERE seller_id = ? AND market = ?",
      [seller, market]
    );

    console.log('rows: ', rows[0])

    if(rows[0].email !== req.session.user) 
      return res.status(401).json({ message: "The user doesn't have an active session" });

    res.json(rows[0]);
  } catch (error) {
    console.log(error);
  }
};

export const createSeller = async (req, res) => {
  try {
    const { market } = req.params;
    const { name, lastname, dni, email, password } = req.body;

    const SECRET = process.env.SECRET

    if (!name || !lastname || !dni || !email || !password)
      return res.status(400).json({ message: "Complete all fields" });

    const [result] = await pool.query(
      "INSERT INTO sellers (name,lastname,dni,email,password, position, market) VALUES (?,?,?,?,AES_ENCRYPT(?, ?),'seller',?)",
      [name, lastname, dni, email, password, 
        SECRET, market]
    );

    res.send({
      seller_id: result.insertId,
      name,
      lastname,
      dni,
      email,
      market
    });
  } catch (error) {
    console.log(error);
  }
};

export const updateSeller = async (req, res) => {
  try {
    const { market, seller } = req.params;
    const { name, lastname, dni, email, password } = req.body;

    const [result] = await pool.query(
      "UPDATE sellers SET name = IFNULL(?, name), lastname = IFNULL(?, lastname), dni = IFNULL(?, dni), email = IFNULL(?, email), password = IFNULL(?, password) WHERE seller_id = ? AND market = ?",
      [name, lastname, dni, email, password, seller, market]
    );

    const [rows] = await pool.query(
      "SELECT * FROM sellers WHERE seller_id = ? AND market = ?",
      [seller, market]
    );
    res.json(rows[0]);
  } catch (error) {
    console.log(error);
  }
};

export const deleteSeller = async (req, res) => {
  try {
    const { market, seller } = req.params;
    
    const [result] = await pool.query(
      "DELETE FROM sellers WHERE seller_id = ? AND market = ?",
      [seller, market]
    );
    res.send("Seller Deleted");
  } catch (error) {
    console.log(error);
  }
};
