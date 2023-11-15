import { pool } from "../db.js";

import { createUser } from "./users.controller.js";

export const getSellers = async (req, res) => {
  try {
    const { market_id } = req.params;

    const [rows] = await pool.query(
      "SELECT market_id, seller_id, name, lastname, dni, email FROM sellerstest WHERE market_id = ?",
      [market_id]
    );
    res.json(rows);
  } catch (error) {
    console.log(error);
  }
};

// export const getSeller = async (req, res) => {
//   try {
//     const { market, seller_id } = req.params;

//     const [[seller]] = await pool.query(
//       "SELECT market, name, lastname, dni, email, position FROM sellers WHERE market = ? AND seller_id = ? ",
//       [market, seller_id]
//     );

//     res.json(seller);
//   } catch (error) {
//     console.log(error);
//   }
// };

export const getSeller = async (req, res) => {
  try {
    const { market, seller_id } = req.params;

    const [[seller]] = await pool.query(
      "SELECT market_id, name, lastname, dni, email FROM sellerstest WHERE market_id = ? AND seller_id = ? ",
      [market, seller_id]
    );

    res.json(seller);
  } catch (error) {
    console.log(error);
  }
};

export const createSeller = async (req, res) => {
  try {
    console.log(req.params)
    const { market_id } = req.params;
    const { name, lastname, dni, email, password } = req.body;

    const SECRET = process.env.SECRET;

    if (!name || !lastname || !dni || !email || !password)
      return res.status(400).json({ message: "Complete all fields" });

    const [response] = await pool.query("INSERT INTO usersTest (email, password, roles, main_account) VALUES (?, AES_ENCRYPT(?, ?), ?, ?)", [email, password, SECRET, 'seller', market_id])

    const [insertSellerData] = await pool.query("INSERT INTO sellerstest (seller_id, name, lastname, dni, email, position, market_id) VALUES (?, ?, ?, ?, ?, ?, ?)", [response.insertId, name, lastname, dni, email, 'seller', market_id])

    res.json({message: `User ${name + ' ' + lastname} created correctly`});
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
    const [deleteUser] = await pool.query(
      "DELETE FROM users WHERE user_id = ? AND market_id = ?",
      [seller, market]
    );
    res.status(204).json({ message: "Deleted seller" });
  } catch (error) {
    console.log(error);
  }
};
