const express = require("express");
const passport = require("passport");
const helmet = require("helmet");
const cors = require("cors");
const morgan = require("morgan");
const db = require("./models");
const userRoutes = require("./routes/users.routes");
const productRoutes = require("./routes/product.routes");

require("dotenv").config();
require("./auth/passport");

const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
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
