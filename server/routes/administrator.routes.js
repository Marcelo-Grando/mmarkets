import { Router } from "express";
import { createAdministrator, getAdministrators } from "../controllers/administrators.controller.js";

const router = Router()

router.get("/admnistrators/:market", getAdministrators)

//router.get("/administrators/:market/:administrator_id")

router.post("/administrators/:market", createAdministrator);

router.patch("/administrators/:market/:administrator_id");

router.delete("/administrators/:market/:administrator_id");

export default router