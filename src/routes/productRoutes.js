const express = require("express");
const router = express.Router();

const { getProducts, createProduct, deleteProduct, updateProduct } = require("../controllers/productController");
router.get("/products", getProducts);
router.post("/products", createProduct);
router.delete("/products/:id", deleteProduct);
router.put("/products/:id", updateProduct);

module.exports = router;