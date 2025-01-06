const { check, body } = require("express-validator");
const {
  MiddlewareValidator,
} = require("../Middlewares/MiddlewareValidatorError");

exports.createLocationValidator = [
  check("name").notEmpty().withMessage("required Location Name"),
  check("kind").notEmpty().withMessage("required Location Kind"),
  check("location").notEmpty().withMessage("required Location Longitude latitude"),
  check("building").isMongoId().withMessage("Must be a valid ID"),
  body("kind").custom((value, { req }) => {
    if (value === 'indoor') {
      const fields = ['buildingcount', 'floorscount', 'placenumber', 'placename', 'roomnumber', 'details'];
      fields.forEach(field => {
        if (!req.body[field]) {
          throw new Error(`The "${field}" field is required when kind is indoor.`);
        }
      });
    }
    return true;
  }),
  MiddlewareValidator,
];
