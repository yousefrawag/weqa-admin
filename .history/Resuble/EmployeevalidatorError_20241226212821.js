const { check, body } = require("express-validator");
const { default: slugify } = require("slugify");
const bcrypt = require("bcryptjs");
const {
  MiddlewareValidator,
} = require("../Middleware/MiddlewareValidatorError");
const createEmployeeModel = require("../Modules/createEmployee");
const ApiError = require("./ApiErrors");


exports.createEmployeeValidator = [
  check("firstName")
    .notEmpty()
    .withMessage("is required firstName")
    .custom((val, { req }) => {
      req.body.slug = slugify(val);
      return true;
    }),
  check("lastName")
    .notEmpty()
    .withMessage("is required lastName"),

  check("password")
    .notEmpty()
    .withMessage("is required Password")
    .withMessage("To Shoort Password To CreateUser Validator"),
  check("password")
    .isLength({ min: 6 })
    .withMessage("To Shoort Password To CreateUser Validator")
    .custom((val, { req }) => {
      if (val !== req.body.passwordConfirm) {
        return Promise.reject(new Error("Confirm Password No Match"));
      }
      return true;
    }),
  check("passwordConfirm")
    .notEmpty()
    .withMessage("Password confirmation required"),

  check("email").notEmpty().withMessage("is required E-mail"),
  check("email")
    .isEmail()
    .withMessage("Must be at E-mail Address")
    .custom((val) =>
      createEmployeeModel.findOne({ email: val }).then((user) => {
        if (user) {
          return Promise.reject(new Error("ايميل المستخدم موجود بالفعل"));
        }
      })
    ),
  check("email")
    .isEmail()
    .withMessage("Must be at E-mail Address")
    .custom((val) =>
      createTeachersModel.findOne({ email: val }).then((user) => {
        if (user) {
          return Promise.reject(new Error("ايميل المستخدم موجود بالفعل"));
        }
      })
    ),

  check("phone")
    .optional()
    .isMobilePhone(["ar-EG", "ar-SA"])
    .withMessage("Invailable phone number EG , SA Number Only accepted")
    .custom((val) =>
      createEmployeeModel.findOne({ phone: val }).then((user) => {
        if (user) {
          return Promise.reject(new Error("رقم الموبايل مستخدم"));
        }
      })
    ),
  MiddlewareValidator,
];



exports.updateOneUserValidator = [
  check("id").isMongoId().withMessage("Sorry ID Not Available To Update"),
  check("name")
    .optional()
    .custom((val, { req }) => {
      req.body.slug = slugify(val);
      return true;
    }),
  check("image").optional(),
  MiddlewareValidator,
];
exports.deleteOneUserValidator = [
  check("id").isMongoId().withMessage("Sorry ID Not Available To Delete"),
  MiddlewareValidator,
];
exports.UpdateUserPassword = [
  check("currentPasword")
    .notEmpty()
    .withMessage("you Must enter Old password "),
  check("passwordConfirm")
    .notEmpty()
    .withMessage("you Must enter belong password "),
  check("password")
    .notEmpty()
    .withMessage("you Must enter password ")
    .custom(async (val, { req }) => {
      const user = await createEmployeeModel.findById(req.params.id);

      if (!user) {
        throw new ApiError("المستخدم غير موجود", 404);
      }
      const iscorrectPassword = await bcrypt.compare(
        req.body.currentPasword,
        user.password
      );
      if (!iscorrectPassword) {
        throw new ApiError("الباسورد القديم غير صحيح" , 401);
      }
      if (val !== req.body.passwordConfirm) {
        throw new ApiError("in Correct passwordConfirm", 401);
      }
    }),
  MiddlewareValidator,
];
