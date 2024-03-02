import express from "express";
import {
  createCategory,
  deleteCategory,
  editCategory,
  getCategories,
} from "../controllers/category.controller.js";

const router = express.Router();

router.post("/", createCategory);
router.put("/:categoryId", editCategory);
router.delete("/:categoryId", deleteCategory);
router.get("/", getCategories);

export default router;
