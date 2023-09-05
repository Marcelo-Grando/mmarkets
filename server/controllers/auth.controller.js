import { pool } from "../db.js";
import { findUser, comparePassword } from "../middlewares/verify.signin.js";


export const createAccount = async (req, res) => {

  const SECRET = process.env.SECRET

  const { market, adress, email, password } = req.body;
  const [[foundEmail]] = await pool.query(
    "SELECT email FROM markets m WHERE m.email = ?",
    [email]
  );
  if (foundEmail) return res.send("The email is already exist");
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

    console.log(verifyUser)

    if (!verifyUser) {
      return res.status(404).json({message: "The email is not registered"});
    }

    const verify_password = await comparePassword(verifyUser.dni, verifyUser.id, password)

    console.log(verify_password)

    if(!verify_password)
      return res.status(401).json({message: 'Incorrect Password'});

    req.session.user = email

    res.json(verifyUser);
  } catch (error) {
    console.log(error);
  }
};

export const signout = async (req, res) => {
  req.session.destroy()
  res.json({message: 'Session ended successfully'})
}
