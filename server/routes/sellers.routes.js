import { Router } from "express";
import {
  getSellers,
  getSeller,
  createSeller,
  updateSeller,
  deleteSeller,
  profile
} from "../controllers/sellers.controller.js";


const router = Router();

router.get("/profile", profile)

//PROBLEMAS CON TENER DOS GET CON EL MISMO NAME (UNO SE OCUPA EN SIGNIN MOVERLO AHI)

router.get("/sellers/:market", getSellers);

router.get("/sellers/:market/:seller", getSeller);

router.post("/sellers/:market", createSeller);

router.patch("/sellers/:market/:seller", updateSeller);

router.delete("/sellers/:market/:seller", deleteSeller);

export default router;
