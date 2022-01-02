const User = require("../modals/User");

const passport = require("passport");
const bcrypt = require("bcryptjs");

exports.signup_get = (req, res, next) => {
  res.render("signup", {
    user: req.user,
    authType: "Sign up",
  });
};

exports.signup_post = (req, res, next) => {
  bcrypt.hash(req.body.password, 10, (err, hashPassword) => {
    if (err) {
      return next(err);
    }

    const user = new User({
      username: req.body.username,
      password: hashPassword,
    }).save((err) => {
      if (err) {
        return next(err);
      }

      res.redirect("/login");
    });
  });
};

exports.login_get = (req, res, next) => {
  res.render("login", {
    user: req.user,
    authType: "Log in",
  });
};

exports.login_post = (req, res, next) => {
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/",
  })(req, res, next);
};

exports.logout = (req, res, next) => {
  req.logout();
  res.redirect("/");
};
