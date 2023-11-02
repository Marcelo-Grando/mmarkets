import { Router } from "express";
import {
  getSellers,
  getSeller,
  createSeller,
  updateSeller,
  deleteSeller
} from "../controllers/sellers.controller.js";
import { isAdmin } from "../middlewares/verify.signin.js";

const router = Router();

router.get("/sellers/:market", getSellers);

router.get("/sellers/:market/:seller_id", getSeller);

router.post("/sellers/:market", isAdmin, createSeller);

router.patch("/sellers/:market/:seller", updateSeller);

router.delete("/sellers/:market/:seller", deleteSeller);

export default router;