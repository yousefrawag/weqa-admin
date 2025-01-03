const { check } = require("express-validator");
const {
  MiddlewareValidator,
} = require("../Middlewares/MiddlewareValidatorError");

exports.createBuildingValidator = [
  check("name")
    .notEmpty()
    .withMessage("required Building Name"),
  check("kind")
    .notEmpty()
    .withMessage("required Building Kind")
  check("maincategories").isMongoId().withMessage("Must be a valid ID"),
  MiddlewareValidator,
];
