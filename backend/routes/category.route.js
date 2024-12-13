import express from "express";
import {
  createCategory,
  getCategory,
  updateCategory,
} from "../controllers/category.controller.js";
import { protect } from "../middleware/protect.js";
const router = express.Router();

router.get("/", protect, getCategory);
router.post("/", createCategory);
router.put("/:id", updateCategory);

export default router;
