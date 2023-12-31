import { Router } from "express";
import {
  salesTotal,
  salesByCategories,
  salesByProducts,
  salesBySellers,
  salesByDay,
  salesByMonth,
  salesByYear
} from "../controllers/reports.controller.js";

const router = Router();

router.get("/sales-total/:market", salesTotal);

router.get("/sales-categories/:market", salesByCategories);

router.get("/sales-products/:market", salesByProducts);

router.get("/sales-sellers/:market", salesBySellers);

router.get("/sales-by-day/:market", salesByDay)

router.get("/sales-by-month/:market", salesByMonth)

router.get("/sales-by-year/:market", salesByYear)

export default router;
