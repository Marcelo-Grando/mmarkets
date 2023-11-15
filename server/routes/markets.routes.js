import { Router } from "express";
import {
  getMarkets,
  getMarket,
  loginMarket,
  getUserData
  //createMarket
} from "../controllers/markets.controller.js";

const router = Router();

router.get("/markets", getMarkets);

router.get("/markets/:user_id/:user_roles",getUserData);

router.post("/markets_login", loginMarket);

//router.post("/markets_join", createMarket);


export default router;
