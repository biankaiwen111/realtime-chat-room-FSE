const mongoose = require("mongoose");
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.register = async (req, res, next) => {
  const { username, password } = req.body;

  User.findOne({ username })
    .then((user) => {
      if (user) {
        console.log("123");
        return res.status(400).json({ message: "Username already exists!" });
      } else {
        bcrypt.genSalt(10, function (err, salt) {
          bcrypt.hash(password, salt, function (err, hash) {
            // Store to DB
            const user = new User({ username: username, password: hash });
            user
              .save()
              .then((result) => {
                return res
                  .status(200)
                  .json({ message: "User created successfully!" });
              })
              .catch((err) => {
                return res.status(400).json({ message: "User created fail!" });
              });
          });
        });
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.login = async (req, res, next) => {
  const { username, password } = req.body;
  let userName;
  User.findOne({ username })
    .then((user) => {
      if (!user) {
        throw "does not find the user";
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
          return res
            .status(200)
            .json({ message: "Login successfully!", token: token });
        });
      } else {
        //wrong password or username
        throw "incorrect password";
      }
    })
    .catch((err) => {
      res.status(401).json({ message: "Username or password incorrect!" });
      console.log(err);
    });
};
