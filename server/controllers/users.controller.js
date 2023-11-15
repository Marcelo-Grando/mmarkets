import { pool } from "../db.js";



export const getUser = async (req, res) => {

    const {user_id, market_id} = req.params

    const [[{email, rol}]] = await pool.query("SELECT email, rol FROM users WHERE user_id = ? AND market_id = ?", [user_id, market_id])

    const roles = rol.split('&&')

    res.json({email, roles})
} 

export const createUser = async (user_id, email, password, position, rol, market_id) => {
    const SECRET = process.env.SECRET
    try {
        const [response] = await pool.query("INSERT INTO users (user_id, email, password, position, rol, market_id) VALUES (?, ?, AES_ENCRYPT(?, ?), ?, ?, ?)", [user_id, email, password, SECRET, position, rol, market_id])
    } catch(error) {
        console.log(error)
    }
}

export const createUserTest = async (req, res) => {

    const {email, password} = req.body

    const SECRET = process.env.SECRET

    const [response] = await pool.query("INSERT INTO usersTest (email, password) VALUES (?, AES_ENCRYPT(?, ?))", [email, password, SECRET])

    res.json(response)
}