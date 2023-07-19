import { pool } from "../db.js";

export const getHome = async (req, res) => {
    res.send('Home Page')
}