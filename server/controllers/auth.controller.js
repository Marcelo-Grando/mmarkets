import { pool } from "../db.js";
import { findUser, comparePassword } from "../middlewares/verify.signin.js";


export const createAccount = async (req, res) => {

  const SECRET = process.env.SECRET

  const { market, adress, email, password } = req.body;

  if(!market || !email || !adress || !password) 
    return res.status(401).json({message: "faltan datos"})

  const [[foundEmail]] = await pool.query(
    "SELECT email FROM markets m WHERE m.email = ?",
    [email]
  );
  if (foundEmail) return res.status(401).json({message: "The email is already exist"});
  const [rows] = await pool.query(
    "INSERT INTO markets (market,adress,email,password,position) VALUES (?,?,?,AES_ENCRYPT(?, ?),'main-account')",
    [market, adress, email, password, SECRET]
  );
  res.send({
    id: rows.insertId,
    market,
    email,
    adress,
  });
};

export const signin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const verifyUser = await findUser(email);

    if (!verifyUser) {
      return res.status(404).json({message: "The email is not registered"});
    }

    const verify_password = await comparePassword(verifyUser.id, password)

    if(!verify_password)
      return res.status(401).json({message: 'Incorrect Password'});

      console.log(verifyUser.position)
      
      if (verifyUser.position === 'main-account') {
        const [[{foundEmail}]] = await pool.query(
          "SELECT email AS foundEmail FROM markets WHERE email = ?",
          [email]
        );
        req.session.user = foundEmail
      }
      if (verifyUser.position === 'seller') {
        const [[{foundEmail}]] = await pool.query(
          "SELECT email AS foundEmail FROM sellers s WHERE s.email = ?",
          [email]
        );
        req.session.user = foundEmail
      }
      if (verifyUser.position === 'administrator') {
        const [[{foundEmail}]] = await pool.query(
          "SELECT email AS foundEmail FROM administrators WHERE email = ?",
          [email]
        );
        req.session.user = foundEmail
      }

    res.json(verifyUser);
  } catch (error) {
    console.log('error',error);
  }
};

export const signout = async (req, res) => {
  req.session.destroy()
  res.json({message: 'Session ended successfully'})
}
