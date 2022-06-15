const express = require("express");
const {
  getProduct,
  getProductById,
  getAllProduct,
} = require("../controllers/productController");
const router = express.Router();

// GET PRODUCTS
router.get("/", getProduct);

// GET ALL PRODUCTS
router.get("/all", getAllProduct);

// GET SINGLE PRODUCT BY ID
router.get("/:productId", getProductById);

module.exports = router;
