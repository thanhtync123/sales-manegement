const express = require("express");
const router = express.Router();
const upload = require('../config/upload');

const { getProducts, createProduct, deleteProduct, updateProduct } = require("../controllers/productController");
router.get("/products", getProducts);
router.post("/products", upload.single('image'), createProduct);
router.delete("/products/:id", deleteProduct);
router.put("/products/:id", updateProduct);

module.exports = router;