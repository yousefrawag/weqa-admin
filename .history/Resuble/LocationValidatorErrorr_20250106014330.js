const { check } = require("express-validator");
const {
  MiddlewareValidator,
} = require("../Middlewares/MiddlewareValidatorError");

exports.createLocationValidator = [
  check("name").notEmpty().withMessage("required Location Name"),
  check("kind").notEmpty().withMessage("required Location Kind"),
  check("location").notEmpty().withMessage("required Location Longitude latitude"),
  check("building").isMongoId().withMessage("Must be a valid ID"),
  check("levels").notEmpty().withMessage("ID Is Required"),
  MiddlewareValidator,
];
