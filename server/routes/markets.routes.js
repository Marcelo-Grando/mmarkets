import { Router } from "express";
import {
  getMarkets,
  loginMarket,
  createMarket,
  updateMarket,
  deleteMarket,
  redirecciona
} from "../controllers/markets.controller.js";

const router = Router();

router.post("/hola", redirecciona)

router.get("/markets", getMarkets);

//iniciar sesion
router.post("/markets_login", loginMarket);

//crear cuenta
router.post("/markets_join", createMarket);

//actualizar cuenta
router.patch("/markets/:id", updateMarket);

//borrar cuenta
router.delete("/markets/:id", deleteMarket);

export default router;
