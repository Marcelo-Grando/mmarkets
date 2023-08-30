import { Router } from "express";
import { signin, getSellerByEmail, signout } from "../controllers/signin.controller.js";

const router = Router();

router.post("/signin", signin);

router.post('/signout', signout)

router.get("/seller/:email", getSellerByEmail);

export default router;
