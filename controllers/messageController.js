const Message = require("../modals/Message");
const { body, validationResult } = require("express-validator");

exports.create_msg_get = (req, res, next) => {

  if (req.user) {
    res.render("create_msg", {
      user: req.user,
    });
  } else {
    res.redirect("/");
  }

};

exports.create_msg_post = [

  body("title", "Message title is missing")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("message", "Message body is missing")
    .trim()
    .isLength({ min: 1 })
    .escape(),

  (req, res, next) => {
    const errors = validationResult(req);

    const timestamp = new Date();

    const msg = new Message({
      title: req.body.title,
      body: req.body.message,
      username: req.user.username,
      timestamp: timestamp,
    });

    if (!errors.isEmpty()) {
      res.render("create_msg", { user: req.user });
    } 
    else {
      msg.save((error) => {
        if (error) {
          return next(error);
        }

        res.redirect("/");
      });
    }

  },
];

exports.show_msg = (req, res, next) => {
  Message.find().exec((error, msgs) => {
    if (error) {
      return next(error);
    }

    res.render("index", { user: req.user, msgs: msgs });
  });
}