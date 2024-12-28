const { check } = require("express-validator");
const {
  MiddlewareValidator,
} = require("../Middlewares/MiddlewareValidatorError");

exports.createLevelsValidator = [
  check("name").notEmpty().withMessage("required Levels Name"),
  check("category").notEmpty().withMessage("required Levels Name"),
  check("category").isMongoId().withMessage("required Levels Name"),
  MiddlewareValidator,
];
