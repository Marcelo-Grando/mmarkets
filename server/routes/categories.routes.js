import { Router } from "express";
import {
  getCategories,
  getCategory,
  createCategory,
  updateCategory,
  deleteCategory
} from "../controllers/categories.controller.js";

const router = Router();

router.get("/categories/:market", getCategories);

router.get("/categories/:market/:category", getCategory);

router.post("/categories/:market", createCategory);

router.patch("/categories/:market/:category_id", updateCategory);

router.delete("/categories/:market/:category", deleteCategory);

export default router;
