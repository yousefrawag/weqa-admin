const { check } = require("express-validator");
const {
  MiddlewareValidator,
} = require("../Middlewares/MiddlewareValidatorError");

exports.createCateValidator = [
  check("name").notEmpty().withMessage("required Levels Name"),
  MiddlewareValidator,
];
