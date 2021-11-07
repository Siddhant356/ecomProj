const express = require("express");
const router = express.Router();
const userController = require("../controllers/users.controller");
const passport = require("passport");

router.get("/all", userController.getAllUser);

router.get("/find/:id", userController.getUserById);

router.post("/new", userController.addNew);

router.post("/authenticate", userController.authenticate);

router.delete(
  "/delete/:id",
  passport.authenticate("jwt", { session: false }),
  userController.deleteUser
);

module.exports = router;
