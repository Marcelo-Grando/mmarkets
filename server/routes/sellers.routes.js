import { Router } from "express";
import {
  getSellers,
  getSeller,
  createSeller,
  updateSeller,
  deleteSeller
} from "../controllers/sellers.controller.js";

const router = Router();

router.get("/sellers/:market_id", getSellers);

router.get("/sellers/:seller_id", getSeller);

router.post("/sellers/:market_id", createSeller);

router.patch("/sellers/:market/:seller", updateSeller);

router.delete("/sellers/:market/:seller", deleteSeller);

export default router;