const { check } = require("express-validator");
const {
  MiddlewareValidator,
} = require("../Middlewares/MiddlewareValidatorError");

exports.createCategoryValidator = [
  check("name").notEmpty().withMessage("required Levels Name"),
  MiddlewareValidator,
];
