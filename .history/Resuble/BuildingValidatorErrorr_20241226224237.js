const { check } = require("express-validator");
const {
  MiddlewareValidator,
} = require("../Middlewares/MiddlewareValidatorError");

exports.BuildingValidator = [
  check("na").notEmpty().withMessage("الرقم السري مطلوب"),
  MiddlewareValidator,
];
