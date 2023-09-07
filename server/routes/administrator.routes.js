import { Router } from "express";
import { createAdministrator, getAdministrators, getAdministrator } from "../controllers/administrators.controller.js";

const router = Router()

router.get("/administrators/:market", getAdministrators)

router.get("/administrators/:market/:administrator_id", getAdministrator)

router.post("/administrators/:market", createAdministrator);

router.patch("/administrators/:market/:administrator_id");

router.delete("/administrators/:market/:administrator_id");

export default router