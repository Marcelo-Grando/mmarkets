import { pool } from "../db.js";
import jwt from "jsonwebtoken";
import { verifyUser, verifiedPassword } from "../middlewares/verify.signin.js";

// export const signin = async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     const user = await verifyUser(email);

//     if (!user) {
//       return res.status(404).send("The email is not registered");
//     }

//     const verifiedPassword = user.password.toString() === password;

//     if (!verifiedPassword)
//       return res.status(401).json({ auth: false, token: null });

//     const token = jwt.sign({ id: user.id }, "secret", {
//       expiresIn: 60 * 60 * 8,
//     });
    
//     res.cookie("token", token);
//     res.json({ ...user, auth: true, token });
//   } catch (error) {
//     console.log(error);
//   }
// };

export const signin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await verifyUser(email);

    if (!user) {
      return res.status(404).send("The email is not registered");
    }

    const verify_password = await verifiedPassword(user.dni, user.id, password)

    if(!verify_password)
      return res.status(401).json({message: 'Incorrect Password'});

    req.session.user = email

    res.json(user);
  } catch (error) {
    console.log(error);
  }
};

export const signout = async (req, res) => {
  console.log('session id desde signout',req.session.id)
  req.session.destroy()
  res.send(true)
}

export const getSellerByEmail = async (req, res) => {
  try {
    console.log('user: ',req.session.user)

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

export const getusers = async (req, res) => {
  const [[users]] = await pool.query("SELECT AES_DECRYPT(password, 'secret') AS password FROM users")
  console.log(users.password)
  const decrypt = users.password.toString()
  res.send(decrypt)
}
