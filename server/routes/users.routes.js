import { Router } from "express";

import { getUser, createUserTest } from "../controllers/users.controller.js";

const router = Router()

router.get("/users/:user_id/:market_id", getUser);

router.post("/users", createUserTest)

export default router;