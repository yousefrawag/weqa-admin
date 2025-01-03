const { check } = require("express-validator");
const {
  MiddlewareValidator,
} = require("../Middlewares/MiddlewareValidatorError");

exports.createBuildingValidator = [
  check("name").notEmpty().withMessage("required Building Name"),
  check("kind").notEmpty().withMessage("required Building Kind"),
  check("kind").notEmpty().withMessage("required Building Kind"),
  check("levels").isMongoId().withMessage("Must be a valid ID"),
  check("levels").notEmpty().withMessage("ID Is Required"),
  MiddlewareValidator,
];
