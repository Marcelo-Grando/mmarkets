import { pool } from "../db.js";

export const getMarkets = async (req, res) => {
  const [rows] = await pool.query("SELECT market, adress, email FROM markets");
  res.json(rows);
};

// export const getMarket = async (req, res) => {
//   const {market_id} = req.params
//   const [[market]] = await pool.query("SELECT market, adress, email, position FROM markets WHERE market_id = ?", [market_id]);  
//   res.json(market);
// };

// export const loginMarket = async (req, res) => {
//   const { email, password } = req.body;
//   const [rows] = await pool.query("SELECT * FROM markets WHERE email = ?", [
//     email,
//   ]);

//   res.send(rows[0]);
// };


export const getUserData = async (req, res) => {
  const {user_id, user_roles} = req.params

  if(!user_id || !user_roles) return res.status(404).json({message: "User data not found"})

  if (user_roles === 'main-account') {
    const [[user_data]] = await pool.query("SELECT * FROM markettest WHERE market_id = ?", [user_id])
    if(!user_data) return res.status(404).json({message: "User data not found"})
    return res.json(user_data)
  }

  if (user_roles === 'seller') {
    const [[user_data]] = await pool.query("SELECT * FROM sellerstest WHERE seller_id = ?", [user_id])
    if(!user_data) return res.status(404).json({message: "User data not found"})
    return res.json(user_data)
  }

  if (user_roles === 'administrator') {
    const [[user_data]] = await pool.query("SELECT * FROM administrators2 WHERE administrator_id = ?", [user_id])
    console.log(user_data)
    if(!user_data) return res.status(404).json({message: "User data not found"})
    return res.json(user_data)
  }
}

export const getMarket = async (req, res) => {
  const {market_id} = req.params
  const [[marketData]] = await pool.query("SELECT market_id, name, state, adress, email FROM markettest WHERE market_id = ?", [market_id]);  
  res.json(marketData);
};

export const loginMarket = async (req, res) => {
  const { email, password } = req.body;
  const [rows] = await pool.query("SELECT * FROM markets WHERE email = ?", [
    email,
  ]);

  res.send(rows[0]);
};

// export const createMarket = async (req, res) => {
//   const { market, email, adress, password } = req.body;
  
//   const [rows] = await pool.query(
//     "INSERT INTO markets (market,email,adress,password,position) VALUES (?,?,?,?,'main-account')",
//     [market, email, adress, password]
//   );
//   res.send({
//     id: rows.insertId,
//     market,
//     email,
//     adress,
//   });
// };