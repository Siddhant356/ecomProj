const db = require("../models");
const jwt = require("jsonwebtoken");

var functions = {
  getAllUser: function (req, res) {
    db.Users.findAll().then((users) => res.send(users));
  },

  getUserById: function (req, res) {
    db.Users.findAll({
      where: {
        id: req.params.id
      }
    }).then((users) => res.send(users));
  },

  addNew: async function (req, res) {
    const { firstName, lastName, gender, city, country, password, email } =
      req.body;

    const alreadyExistUser = await db.Users.findOne({ where: { email } }).catch(
      (err) => {
        console.log("Error: ", err);
      }
    );

    if (alreadyExistUser) {
      return res.json({ message: "User email already exists." });
    }

    const newUser = new db.Users({
      firstName,
      lastName,
      gender,
      city,
      country,
      password,
      email
    });
    await newUser.save().catch((err) => {
      console.log("Error: ", err);
      return res.json({ message: "Cannot register user at the moment!" });
    });
    res.json({ message: "Success" });
  },

  authenticate: async function (req, res) {
    const { email, password } = req.body;
    const userWithEmail = await db.Users.findOne({ where: { email } }).catch(
      (err) => {
        console.log("Error: ", err);
      }
    );
    if (!userWithEmail)
      return res.json({ message: "Email or password does not match!" });

    if (userWithEmail.password !== password)
      return res.json({ message: "Email or password does not match!" });
    const jwtToken = jwt.sign(
      { id: userWithEmail.id, email: userWithEmail.email },
      process.env.JWT_SECRET
    );
    res.json({
      message: `Welcom ${userWithEmail.firstName}`,
      token: jwtToken
    });
  },

  deleteUser: function (req, res) {
    db.Users.destroy({
      where: {
        id: req.params.id
      }
    }).then(() => res.send("success"));
  }
};

module.exports = functions;
