const express = require("express");
const router = express.Router();

const { getProducts, getProduct } = require("../controllers/productController");

router.get("/products", getProducts);
router.get("/products/:id", getProduct);

module.exports = router;