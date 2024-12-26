const { check } = require("express-validator");
const {
  MiddlewareValidator,
} = require("../Middlewares/MiddlewareValidatorError");

exports.BuildingValidator = [
  check("name").notEmpty().withMessage("required Building Name"),
  MiddlewareValidator,
];
