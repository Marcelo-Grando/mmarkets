import { Router } from "express";
import { signin, getSellerByEmail } from "../controllers/signin.controller.js";

const router = Router();

router.post("/signin", signin);

router.get("/seller/:email", getSellerByEmail);

export default router;
