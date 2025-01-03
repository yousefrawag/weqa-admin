const { check } = require("express-validator");
const {
  MiddlewareValidator,
} = require("../Middlewares/MiddlewareValidatorError");

exports.createMainCategoryValidator = [
  check("name").notEmpty().withMessage("required MainCategory Name").custom((val, { req }) => {
    req.body.slug = slugify(val);
    return true;
  }),,
  MiddlewareValidator,
];
