import { Router } from "express";
import { getSales, createSale } from "../controllers/sales.controller.js";

const router = Router();

router.get("/sales/:market", getSales);

router.post("/sales/:market/:seller", createSale);

export default router;
