import { Router } from "express";
import {
  createAccount,
  signin,
  signout,
} from "../controllers/auth.controller.js";

const router = Router();

router.post("/markets", createAccount);

router.post("/signin", signin);

router.post("/signout", signout);

export default router;
