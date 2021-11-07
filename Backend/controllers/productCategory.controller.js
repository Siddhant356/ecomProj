const db = require("../models");
const jwt = require("jsonwebtoken");

var functions = {
  getAllProductCategory: function (req, res) {
    db.ProductCategory.findAll().then((productCategory) =>
      res.send(productCategory)
    );
  },

  addNewProductCategory: function (req, res) {
    db.ProductCategory.create({
      productCategoryName: req.body.productCategoryName,
      description: req.body.description,
    }).then((submitedCategory) => res.send(submitedCategory));
  },
};

module.exports = functions;
