const express = require("express");
const router = express.Router();
const db = require("../models");

router.get("/all", (req, res) => {
  db.Product.findAll().then((product) => res.send(product));
});

router.get("/productcategory/all", (req, res) => {
  db.ProductCategory.findAll().then((productCategory) =>
    res.send(productCategory)
  );
});

router.get("/find/:id", (req, res) => {
  db.Product.findAll({
    where: {
      id: req.params.id,
    },
  }).then((product) => res.send(product));
});

router.post("/new", (req, res) => {
  db.Product.create({
    productName: req.body.productName,
    description: req.body.description,
    price: req.body.price,
    image: req.body.image,
    productCategoryId: req.body.productCategoryId,
    quantity: req.body.quantity,
  })
    .then((submitedProduct) => res.send(submitedProduct))
    .catch((error) => {
      res.send(error);
    });
});

router.post("/newcategory", (req, res) => {
  db.ProductCategory.create({
    productCategoryName: req.body.productCategoryName,
    description: req.body.description,
  }).then((submitedCategory) => res.send(submitedCategory));
});

router.delete("/delete/:id", (req, res) => {
  db.Product.destroy({
    where: {
      id: req.params.id,
    },
  }).then(() => res.send("success"));
});

module.exports = router;
