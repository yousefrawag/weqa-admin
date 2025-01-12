const { check, body } = require("express-validator");
const {
  MiddlewareValidator,
} = require("../Middlewares/MiddlewareValidatorError");
const ApiError = require("../Validations/ApiError");

exports.createLocationValidator = [
  check("name").notEmpty().withMessage("required Location Name"),
  check("kind").notEmpty().withMessage("required Location Kind"),
  check("location")
    .notEmpty()
    .withMessage("required Location Longitude latitude"),
  check("building").isMongoId().withMessage("Must be a valid ID"),

  body("kind").custom((value, { req }) => {
    if (value === "indoor") {
      if (!req.body.floors || req.body.floors.length === 0) {
        throw new ApiError('The "floors" field is required when kind is indoor.', 404);
      }
  
      req.body.floors = req.body.floors.map((floor) => {
        if (!floor.areas) {
          throw new ApiError('The "areas" field is required when kind is indoor.', 404); // تم تصحيح الرسالة
        }
  
        return floor;
      });
    }
  
    return true;
  }),
  

  MiddlewareValidator,
];
