import { Router } from "express";
import { signin, getSellerByEmail, signout, getusers } from "../controllers/signin.controller.js";

const router = Router();

router.post("/signin", signin);

router.post('/signout', signout)

router.get("/seller/:email", getSellerByEmail);

router.get("/users", getusers)

export default router;
