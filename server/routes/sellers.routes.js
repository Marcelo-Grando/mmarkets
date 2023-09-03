import { Router } from "express";
import {
  getSellers,
  getSeller,
  createSeller,
  updateSeller,
  deleteSeller,
  profile
} from "../controllers/sellers.controller.js";

import { verifySession } from "../middlewares/verify.signin.js";


const router = Router();

router.get("/profile", profile)

//PROBLEMAS CON TENER DOS GET CON EL MISMO NAME (UNO SE OCUPA EN SIGNIN MOVERLO AHI)

router.get("/sellers/:market", verifySession, getSellers);

router.get("/sellers/:market/:seller", getSeller);

router.post("/sellers/:market",verifySession, createSeller);

router.patch("/sellers/:market/:seller", updateSeller);

router.delete("/sellers/:market/:seller", deleteSeller);

export default router;
