import { Router } from "express";
import { getSales, createSale } from "../controllers/sales.controller.js";
import { verifySession } from "../middlewares/verify.signin.js";


const router = Router();

router.get("/sales/:market", getSales);

router.post("/sales/:market/:seller",verifySession, createSale);

export default router;
