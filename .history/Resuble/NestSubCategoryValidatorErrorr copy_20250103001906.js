const { check } = require("express-validator");
const {
  MiddlewareValidator,
} = require("../Middlewares/MiddlewareValidatorError");

exports.createNestsubCategoryValidator = [
  check("name").notEmpty().withMessage("required subCategory Name"),
  check("subcategories").isMongoId().withMessage("Must be a valid ID"),
  MiddlewareValidator,
];
