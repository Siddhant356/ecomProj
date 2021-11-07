const express = require("express");
const productController = require("../controllers/product.controller");
const productCategoryController = require("../controllers/productCategory.controller");

const router = express.Router();
const db = require("../models");

router.get("/all", productController.getAllProducts);

router.get("/find/:id", productController.getProductById);

router.post("/new", productController.addNewProduct);

router.delete("/delete/:id", productController.deleteProduct);

router.get(
  "/productcategory/all",
  productCategoryController.getAllProductCategory
);

router.post("/newcategory", productCategoryController.addNewProductCategory);

module.exports = router;
