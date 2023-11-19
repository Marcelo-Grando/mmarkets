import { pool } from "../db.js";

export const verifyEmail = async (req, res, next) => {
  const { email } = req.body;

  const [[user]] = await pool.query("SELECT * FROM userstest WHERE email = ?", [
    email,
  ]);

  if (!user)
    return res.status(401).json({ message: "The email is not registered" });

  next();
};

export const verifySession = async (req, res, next) => {
  try {  

    if(!req.session.id) return res.status(401).json({ message: "The user doesn't have an active session" });

    const [[response]] = await pool.query(
      "SELECT * FROM sessions WHERE session_id = ?",
      [req.session.id]
    );

    if (!response)
      return res
        .status(401)
        .json({ message: "The user doesn't have an active session" });

    const session_cookie = JSON.parse(response.data);

    if (!session_cookie.user)
      return res
        .status(401)
        .json({ message: "The user doesn't have an active session" });

    console.log("verify session");

    next();
  } catch (error) {
    console.log(error);
  }
};
export const verifyPassword = async (req, res, next) => {
  const SECRET = process.env.SECRET;

  const [[user_password]] = await pool.query(
    "SELECT AES_DECRYPT(password, ?) AS value FROM userstest WHERE email = ?",
    [SECRET, req.body.email]
  );

  if (user_password) {
    if (user_password.value.toString() !== req.body.password)
      return res.status(401).json({ message: "Incorrect Password" });
  }

  req.validate_user = true

  next();
};

export const findUser = async (email) => {
  const [[user]] = await pool.query(
    "SELECT user_id FROM usersTest WHERE email = ?",
    [email]
  );

  const [[seller]] = await pool.query(
    "SELECT name, lastname, position, market AS market_id, seller_id AS id FROM sellers WHERE email = ?",
    [email]
  );

  const [[market]] = await pool.query(
    "SELECT market, email, position, market_id, market_id AS id FROM markets WHERE email = ?",
    [email]
  );

  const [[administrator]] = await pool.query(
    "SELECT name, email, lastname, dni, position, market AS market_id, administrator_id AS id FROM administrators WHERE email = ?",
    [email]
  );

  if (!user) return;

  if (seller) return seller;

  if (administrator) return administrator;

  if (market) return market;
};

// export const comparePassword = async (user_id, user_password) => {

//   const SECRET = process.env.SECRET

//   const [[seller_password]] = await pool.query(
//     "SELECT AES_DECRYPT(password, ?) AS value FROM sellers WHERE seller_id = ?",
//     [SECRET, user_id]
//   );
//   const [[market_password]] = await pool.query(
//     "SELECT AES_DECRYPT(password, ?) AS value FROM markets WHERE market_id = ?",
//     [SECRET, user_id]
//   );
//   const [[administrator_password]] = await pool.query(
//     "SELECT AES_DECRYPT(password, ?) AS value FROM administrators WHERE administrator_id = ?",
//     [SECRET, user_id]
//   );

//   if (seller_password)
//     return seller_password.value.toString() === user_password;
//   if (market_password)
//     return market_password.value.toString() === user_password;
//   if (administrator_password)
//     return administrator_password.value.toString() === user_password;
// };

// export const findUser = async (email) => {
//   const [[seller]] = await pool.query(
//     "SELECT name, lastname, position, market AS market_id, seller_id AS id FROM sellers WHERE email = ?",
//     [email]
//   );

//   const [[market]] = await pool.query(
//     "SELECT market, email, position, market_id, market_id AS id FROM markets WHERE email = ?",
//     [email]
//   );

//   const [[administrator]] = await pool.query(
//     "SELECT name, email, lastname, dni, position, market AS market_id, administrator_id AS id FROM administrators WHERE email = ?",
//     [email]
//   );

//   if (!seller && !market && !administrator) return;

//   if (seller) return seller;

//   if (administrator) return administrator;

//   if (market) return market;
// };
