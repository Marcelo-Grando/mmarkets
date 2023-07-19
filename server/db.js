import { createPool } from "mysql2/promise";

export const pool = createPool({
  host: "localhost",
  user: "root",
  password: "Fedora/017",
  port: 3306,
  database: "mmarkets",
});
