import { Router } from "express";
import {
  getProducts,
  getProductByName,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/products.controller.js";

const router = Router();

router.get("/products/:market", getProducts);

router.get("/products/:market/:product", getProductByName);

router.post("/products/:market", createProduct);

router.patch("/products/:market/:product_id", updateProduct);

router.delete("/products/:market/:product", deleteProduct);

export default router;
