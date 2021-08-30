const express = require("express");
const { body, validationResult } = require("express-validator");
const User = require("../models/User");
const passport = require("passport");
const bcrypt = require("bcrypt");

const router = express.Router();

router.get("/", (req, res, next) => {
  res.status(200).json({
    message: "users route",
  });
});

router.post(
  "/",
  body("email").isEmail().withMessage("must be a valid email address"),
  body("username")
    .isLength({ min: 4 })
    .withMessage("must be at least 4 chars long")
    .isLength({ max: 20 })
    .withMessage("must be no longer than 20 chars long"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("must be at least 6 chars long"),
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    bcrypt.hash(req.body.password, 10, async (err, hash) => {
      const newUser = new User({
        email: req.body.email,
        username: req.body.username,
        encryptedPassword: hash,
      });
      newUser.role = "restricted";
      try {
        const savedUser = await newUser.save();
        res.status(201).json({ user: savedUser });
      } catch (err) {
        return res.status(409).json({ errors: Object.values(err.errors) });
      }
    });
  }
);

router.post("/login", function (req, res, next) {
  console.log("login route accessed");
  console.log(req.body);
  passport.authenticate("local", function (err, user, info) {
    if (err) {
      return next(err);
    }
    if (!user) {
      const error = new Error("no user found");
      error.status = 401;
      return next(error);
    }
    req.logIn(user, function (err) {
      if (err) {
        return next(err);
      }
      return res.json({ message: "user logged in", user });
    });
  })(req, res, next);
});

router.get("/getuser", (req, res, next) => {
  if (req.user) {
    res.json({ user: req.user });
  }
  res.json({ user: null });
});

router.get("/logout", function (req, res) {
  req.logout();
  res.json({ message: "user logged out" });
});

module.exports = router;
