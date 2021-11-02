const express = require("express");
const router = express.Router();
const db = require("../models");

router.get("/all", (req, res) => {
  db.Users.findAll().then((users) => res.send(users));
});

router.get("/find/:id", (req, res) => {
  db.Users.findAll({
    where: {
      id: req.params.id,
    },
  }).then((users) => res.send(users));
});

router.post("/new", (req, res) => {
  db.Users.create({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    username: req.body.username,
    password: req.body.password,
    email: req.body.email,
  }).then((submitedUser) => res.send(submitedUser));
});

router.delete("/delete/:id", (req, res) => {
  db.Users.destroy({
    where: {
      id: req.params.id,
    },
  }).then(() => res.send("success"));
});

module.exports = router;
