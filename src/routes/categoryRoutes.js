const express = require("express");
const router = express.Router();

const { getCategories, createCategory, deleteCategory,updateCategory } = require("../controllers/categoryController");
router.get("/categories", getCategories);
router.post("/categories", createCategory);
router.delete("/categories/:id", deleteCategory);
router.put("/categories/:id", updateCategory);
module.exports = router;