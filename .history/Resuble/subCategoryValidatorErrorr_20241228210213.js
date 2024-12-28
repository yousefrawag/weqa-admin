const { check } = require("express-validator");
const {
  MiddlewareValidator,
} = require("../Middlewares/MiddlewareValidatorError");

exports.createsubCategoryValidator = [
  check("name").notEmpty().withMessage("required subCategory Name"),
  check("levels").isMongoId().withMessage("Must be a valid ID"),
  MiddlewareValidator,
];
