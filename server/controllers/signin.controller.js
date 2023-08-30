import { pool } from "../db.js";
import jwt from "jsonwebtoken";
import { verifyUser } from "../middlewares/verify.signin.js";

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

    console.log(user.password.toString())

    const verifiedPassword = user.password.toString() === password;

    if (!verifiedPassword)
      return res.status(401).json({ auth: false, token: null });

    const token = jwt.sign({ id: user.id }, "secret", {
      expiresIn: 60 * 60 * 8,
    });
    
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
