import { Router } from "express";
import { getPxs, createPxs } from "../controllers/pxs.controller.js";

const router = Router();

router.get("/pxs", getPxs);

router.post("/pxs", createPxs);

export default router;