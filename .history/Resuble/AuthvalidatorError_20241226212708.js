const { check } = require("express-validator");
const {
  MiddlewareValidator,
} = require("../Middlewares/MiddlewareValidatorError");

exports.LoginValidator = [
  check("password").notEmpty().withMessage("الرقم السري مطلوب"),

  check("identity").notEmpty().withMessage("رقم الهويه مطلوب"),
  MiddlewareValidator,
];
