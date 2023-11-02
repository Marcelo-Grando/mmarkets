import { Router } from "express";

import { getUser } from "../controllers/users.controller.js";

const router = Router()

router.get("/users/:user_id/:market_id", getUser);

export default router;