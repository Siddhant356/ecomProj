const express = require("express");
const passport = require("passport");
const helmet = require("helmet");
const cors = require("cors");
const morgan = require("morgan");
const db = require("./models");
const userRoutes = require("./routes/users.routes");
const productRoutes = require("./routes/product.routes");
const expressLayouts = require("express-ejs-layouts");

require("dotenv").config();
require("./auth/passport");

const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(expressLayouts);
app.set("layout", "index");
app.set("view engine", "ejs");

app.get("", (req, res) => {
  res.render("index");
});

app.get("/cart", (req, res) => {
  res.render("cart", {
    layout: "cart"
  });
});

app.get("/catalogListPage", (req, res) => {
  res.render("catalog-list-page", {
    layout: "catalog-list-page"
  });
});

app.get("/checkout", (req, res) => {
  res.render("checkout", {
    layout: "checkout"
  });
});

app.get("/productDetail", (req, res) => {
  res.render("product-detail", {
    layout: "product-detail"
  });
});

app.get("/register", (req, res) => {
  res.render("register", {
    layout: "register"
  });
});

app.use(morgan("dev"));
app.use(helmet());
app.use(cors());
app.use(passport.initialize());

app.use("/api/user", userRoutes);
app.use("/api/product", productRoutes);

db.sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`running on: http://localhost:${PORT}`);
  });
});
