import { Router } from "express";
import {
  getMarkets,
  getMarket,
  loginMarket,
  //createMarket
} from "../controllers/markets.controller.js";

const router = Router();

router.get("/markets", getMarkets);

router.get("/markets/:market_id",getMarket);

router.post("/markets_login", loginMarket);

//router.post("/markets_join", createMarket);


export default router;
