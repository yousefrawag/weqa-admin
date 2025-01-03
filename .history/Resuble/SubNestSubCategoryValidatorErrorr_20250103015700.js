const { check } = require("express-validator");
const {
  MiddlewareValidator,
} = require("../Middlewares/MiddlewareValidatorError");

exports.createSubNestSubCategoryValidator = [
  check("name").notEmpty().withMessage("required subCategory Name"),
  check("nestSubCategory").isMongoId().withMessage("Must be a valid ID"),
  MiddlewareValidator,
];
