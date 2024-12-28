const { check } = require("express-validator");
const {
  MiddlewareValidator,
} = require("../Middlewares/MiddlewareValidatorError");

exports.createLevelsValidator = [
  check("name").notEmpty().withMessage("required Levels Name"),
  check("category").notEmpty().withMessage("required Levels Name"),
  check("category").mon().withMessage("required Levels Name"),
  MiddlewareValidator,
];
