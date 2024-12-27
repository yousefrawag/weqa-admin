const { check } = require("express-validator");
const {
  MiddlewareValidator,
} = require("../Middlewares/MiddlewareValidatorError");

exports.createValidator = [
  check("name").notEmpty().withMessage("required Building Name"),
  MiddlewareValidator,
];
