const { check, body } = require("express-validator");
const { default: slugify } = require("slugify");
const bcrypt = require("bcryptjs");
const ApiError = require("./ApiErrors");
const {
  MiddlewareValidator,
} = require("../Middlewares/MiddlewareValidatorError");
const createEmployeeModel = require("../Models/createEmployee");

exports.createEmployeeValidator = [
  check("username")
    .notEmpty()
    .withMessage("is required Name")
    .custom((val, { req }) => {
      req.body.slug = slugify(val);
      return true;
    }),

  check("password")
    .notEmpty()
    .withMessage("is required Password")
    .withMessage("To Shoort Password To CreateUser Validator"),
  check("passwordConfirm")
    .notEmpty()
    .withMessage("Password confirmation required"),
  check("grander").notEmpty().withMessage("grander required"),
  check("identity")
    .notEmpty()
    .withMessage("identity required")
    .custom((val) =>
      createEmployeeModel.findOne({ identity: val }).then((employee) => {
        if (employee) {
          return Promise.reject(new Error("employee identity already exists"));
        }
      })
    ),
  check("employeeNumber")
    .notEmpty()
    .withMessage("employeeNumber required")
    .custom((val) =>
      createEmployeeModel.findOne({ employeeNumber: val }).then((employee) => {
        if (employee) {
          return Promise.reject(new Error("employee number already exists"));
        }
      })
    ),

  check("role").notEmpty().withMessage("role required"),

  check("email").notEmpty().withMessage("is required E-mail"),
  check("email")
    .isEmail()
    .withMessage("Must be at E-mail Address")
    .custom((val) =>
      createEmployeeModel.findOne({ email: val }).then((user) => {
        if (user) {
          return Promise.reject(new Error("employee Email already exists"));
        }
      })
    ),
  check("phone")
    .notEmpty()
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
        throw new ApiError("الباسورد القديم غير صحيح", 401);
      }
      if (val !== req.body.passwordConfirm) {
        throw new ApiError("in Correct passwordConfirm", 401);
      }
    }),
  MiddlewareValidator,
];
