import express from "express";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import session from "express-session";
import MySQLStoreClassFactory from "express-mysql-session";
import { pool } from "./db.js";

import marketRoutes from "./routes/markets.routes.js";
import categoriesRoutes from "./routes/categories.routes.js";
import sellersRotes from "./routes/sellers.routes.js";
import salesRoutes from "./routes/sales.routes.js";
import productsRotes from "./routes/products.routes.js";
import pxsRotes from "./routes/pxs.routes.js";
import reportRoutes from "./routes/reports.routes.js";
import authRoutes from "./routes/auth.routes.js";
import administratorsRoutes from "./routes/administrator.routes.js";

import { verifySession } from "./middlewares/verify.signin.js";

import * as url from 'url';
const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

const app = express();

import * as dotenv from 'dotenv'
dotenv.config({path: `${__dirname}/.env`})


app.use(express.json());

app.use(cookieParser());

app.use(morgan("dev"));

app.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173" 
  }),
);

const MySQLStore = MySQLStoreClassFactory(session);

const sessionStore = new MySQLStore(
  {
    schema: {
      tableName: "sessions",
      columnNames: {
        session_id: "session_id",
        expires: "expires",
        data: "data",
      },
    },
  },
  pool
);

app.use(
  session({
    key: "user_session",
    secret: "secret",
    resave: false,
    store: sessionStore,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 8,
    },
  })
);


app.use("/api", authRoutes);
app.use("/api", verifySession, marketRoutes);
app.use("/api", categoriesRoutes);
app.use("/api", verifySession, sellersRotes);
app.use("/api", verifySession, administratorsRoutes);
app.use("/api", verifySession, salesRoutes);
app.use("/api", pxsRotes);
app.use("/api", reportRoutes);
app.use("/api", productsRotes);

app.use((req, res) => {
  res.status(404).json({
    message: "the requested url does not exist",
  });
});

export default app;
