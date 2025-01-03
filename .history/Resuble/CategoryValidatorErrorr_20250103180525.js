const { check } = require("express-validator");
const {
  MiddlewareValidator,
} = require("../Middlewares/MiddlewareValidatorError");

exports.createCategoryValidator = [
  check("name")
    .notEmpty()
    .withMessage("required Category Name")
  ,
  check("maincategories").isMongoId().withMessage("Must be a valid ID"),
  MiddlewareValidator,
];
