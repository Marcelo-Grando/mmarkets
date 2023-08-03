import { Router } from "express";
import {
  getSellers,
  getSeller,
  createSeller,
  updateSeller,
  deleteSeller,
  profile,
  getSellerByEmail
} from "../controllers/sellers.controller.js";


const router = Router();

router.get("/profile", profile)

router.get("/sellers/:email", getSellerByEmail)

router.get("/sellers/:market", getSellers);

router.get("/sellers/:market/:seller", getSeller);

router.post("/sellers/:market", createSeller);

router.patch("/sellers/:market/:seller", updateSeller);

router.delete("/sellers/:market/:seller", deleteSeller);

export default router;
