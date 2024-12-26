const { check } = require("express-validator");


exports.BuildingValidator = [
  check("name").notEmpty().withMessage("required Building Name"),
  MiddlewareValidator,
];
