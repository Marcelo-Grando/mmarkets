import { Router } from "express";
import {
  getSellers,
  getSeller,
  createSeller,
  updateSeller,
  deleteSeller,
  profile,
} from "../controllers/sellers.controller.js";
import { signin } from "../controllers/signin.controller.js";

const router = Router();

router.get("/profile", profile)

router.post('/signin', signin)

router.get("/sellers/:market", getSellers);

router.get("/sellers/:market/:seller", getSeller);

router.post("/sellers/:market", createSeller);

router.patch("/sellers/:market/:seller", updateSeller);

router.delete("/sellers/:market/:seller", deleteSeller);

export default router;
