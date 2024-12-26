const { check } = require("express-validator");
const {
  MiddlewareValidator,
} = require("../Middlewares/MiddlewareValidatorError");

exports.createBuildingValidator = [
  check("name").notEmpty().withMessage("required Building Name"),
  MiddlewareValidator,
];
