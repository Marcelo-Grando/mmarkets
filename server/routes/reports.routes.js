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

router.get("/sales_total/:market", salesTotal);

router.get("/sales_categories/:market", salesByCategories);

router.get("/sales_products/:market", salesByProducts);

router.get("/sales_sellers/:market", salesBySellers);

router.get("/sales_by_day/:market", salesByDay)

router.get("/sales_by_month/:market", salesByMonth)

router.get("/sales_by_year/:market", salesByYear)

export default router;
