const { check } = require("express-validator");


exports.LoginValidator = [
  check("password").notEmpty().withMessage("الرقم السري مطلوب"),

  check("identity").notEmpty().withMessage("رقم الهويه مطلوب"),
  Middle,
];
