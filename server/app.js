import express from "express";
import cors from 'cors'
import morgan from "morgan";

import marketRoutes from "./routes/markets.routes.js";
import categoriesRoutes from "./routes/categories.routes.js";
import sellersRotes from "./routes/sellers.routes.js";
import salesRoutes from "./routes/sales.routes.js";
import productsRotes from "./routes/products.routes.js";
import pxsRotes from "./routes/pxs.routes.js";
import getHome from "./routes/home.routes.js";
import reportRoutes from "./routes/reports.routes.js"
import signinRoutes from "./routes/signinSellers.routes.js"
import authRoutes from "./routes/auth.routes.js"

const app = express();
app.use(express.json());
app.use(morgan('dev'))

app.use(cors())

app.use(getHome);
app.use('/api',authRoutes)
app.use('/api', signinRoutes)
app.use('/api',marketRoutes);
app.use('/api',categoriesRoutes);
app.use('/api',sellersRotes);
app.use('/api',salesRoutes);
app.use('/api',productsRotes);
app.use('/api',pxsRotes);
app.use('/api',reportRoutes)

app.use((req, res) => {
  res.status(404).json({
    message: "the requested url does not exist",
  });
});

export default app;
