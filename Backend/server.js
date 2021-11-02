const express = require("express");
const db = require("./models");
const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const userRoutes = require("./routes/users.routes");
const productRoutes = require("./routes/product.routes");

app.use("/api/user", userRoutes);
app.use("/api/product", productRoutes);

db.sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`running on: http://localhost:${PORT}`);
  });
});
