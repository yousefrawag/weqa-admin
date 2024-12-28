const { check } = require("express-validator");
const {
  MiddlewareValidator,
} = require("../Middlewares/MiddlewareValidatorError");

exports.createMainCategoryValidator = [
  check("name").notEmpty().withMessage("required MainCategory Name"),
  MiddlewareValidator,
];
