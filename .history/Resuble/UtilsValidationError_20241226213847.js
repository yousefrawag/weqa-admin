const { check } = require("express-validator");


exports.UtilsValidator = [
  check("id").isMongoId().withMessage("المعرف غير موجود"),
  MiddlewareValidator,
];
