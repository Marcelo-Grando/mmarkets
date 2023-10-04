import { Router } from "express";
import { getSales, createSale, createTicket } from "../controllers/sales.controller.js";

const router = Router();

router.get("/sales/:market", getSales);

router.post("/sales/:market/:seller", createSale);

router.post("/sales/tickets", createTicket)

export default router;
