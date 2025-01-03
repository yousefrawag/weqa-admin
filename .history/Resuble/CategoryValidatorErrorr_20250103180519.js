const { check } = require("express-validator");
const {
  MiddlewareValidator,
} = require("../Middlewares/MiddlewareValidatorError");

exports.createCategoryValidator = [
  check("name")
    .notEmpty()
    .withMessage("required Category Name")
  .custom((val, { req }) => {
      req.body.slug = slugify(val);
      return true;
    }),
  ,
  check("maincategories").isMongoId().withMessage("Must be a valid ID"),
  MiddlewareValidator,
];
