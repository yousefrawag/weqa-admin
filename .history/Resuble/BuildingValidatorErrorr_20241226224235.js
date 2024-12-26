const { check } = require("express-validator");
const {
  MiddlewareValidator,
} = require("../Middlewares/MiddlewareValidatorError");

exports.BuildingValidator = [
  check("nشةث").notEmpty().withMessage("الرقم السري مطلوب"),
  MiddlewareValidator,
];
