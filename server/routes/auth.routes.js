import { Router } from "express";
import { createAccount} from "../controllers/auth.controller.js";

const router = Router()

//router.post('/signIn', signIn)
router.post('/markets',createAccount)

export default router