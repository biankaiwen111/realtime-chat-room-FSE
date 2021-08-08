const mongoose = require("mongoose");
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.register = async (req, res, next) => {
  const { username, password } = req.body;

  bcrypt.genSalt(10, function (err, salt) {
    bcrypt.hash(password, salt, function (err, hash) {
      // Store to DB
      const user = new User({ username: username, password: hash });
      user
        .save()
        .then((result) => {
          res.json({ message: "User created successfully!" });
        })
        .catch((err) => {
          res.json({ message: "User created fail!" });
        });
    });
  });
};

exports.login = async (req, res, next) => {
  const { username, password } = req.body;
  let userName;
  User.findOne({ username })
    .then((user) => {
      if (!user) {
        res.json({ message: "wrong password or username!" });
      }
      userName = user.username;
      const hashedPassword = user.password;

      return bcrypt.compare(password, hashedPassword);
    })
    .then((result) => {
      //console.log(id);
      if (result === true) {
        //login successfully
        jwt.sign({ username: userName }, process.env.PK, function (err, token) {
          return res.json({ message: "Login successfully!", token: token });
        });
      } else {
        //wrong password or username
        return res.json({ message: "username or password is incorrect!" });
      }
    })
    .catch((err) => {
      console.log(err);
    });
};
