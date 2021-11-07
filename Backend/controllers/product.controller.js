const db = require("../models");
const jwt = require("jsonwebtoken");

var functions = {
  getAllProducts: function (req, res) {
    db.Product.findAll({ include: [db.ProductCategory] }).then((product) =>
      res.send(product)
    );
  },

  getProductById: function (req, res) {
    db.Product.findAll({
      where: {
        id: req.params.id,
      },
      include: [db.ProductCategory],
    }).then((product) => res.send(product));
  },

  addNewProduct: function (req, res) {
    db.Product.create({
      productName: req.body.productName,
      description: req.body.description,
      price: req.body.price,
      image: req.body.image,
      ProductCategoryId: req.body.ProductCategoryId,
      quantity: req.body.quantity,
    })
      .then((submitedProduct) => res.send(submitedProduct))
      .catch((error) => {
        res.send(error);
      });
  },

  deleteProduct: function (req, res) {
    db.Product.destroy({
      where: {
        id: req.params.id,
      },
    }).then(() => res.send("success"));
  },
};

module.exports = functions;
