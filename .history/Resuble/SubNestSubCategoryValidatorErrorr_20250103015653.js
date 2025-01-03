const { check } = require("express-validator");
const {
  MiddlewareValidator,
} = require("../Middlewares/MiddlewareValidatorError");

exports.createubCategoryValidator = [
  check("name").notEmpty().withMessage("required subCategory Name"),
  check("nestSubCategory").isMongoId().withMessage("Must be a valid ID"),
  MiddlewareValidator,
];
