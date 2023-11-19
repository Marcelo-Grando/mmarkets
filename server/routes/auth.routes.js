import { Router } from "express";
import {
  createMarket,
  signin,
  signout,
} from "../controllers/auth.controller.js";


import { verifyEmail, verifyPassword } from "../middlewares/verify.signin.js";

const router = Router();

//router.post("/markets", createAccount);

router.post("/markets", createMarket)

router.post("/signin", verifyEmail, verifyPassword, signin);

router.post("/signout", signout);

export default router;
