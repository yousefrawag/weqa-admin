const { check, body } = require("express-validator");
const { default: slugify } = require("slugify");

const {
  MiddlewareValidator,
} = require("../Middlewares/MiddlewareValidatorError");
const createEmployeeModel = require("../Models/createEmployee");
const createPermissionModel = require("../Models/createPermission");

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
    check("permissions")
    .notEmpty()
    .withMessage("الصلاحية مطلوبة")
    .custom(async (val) => {
      const permission = await createPermissionModel.findOne({ _id: val });
  
      if (!permission) {
        throw new Error("الصلاحية غير موجودة");
      }
    }),
  
  MiddlewareValidator,
];

exports.updateEmployeeValidator = [
  check("id").isMongoId().withMessage("Not a valid employeeID"),
  check("username")
    .optional()
    .custom((val, { req }) => {
      req.body.slug = slugify(val);
      return true;
    }),

  check("identity")
    .optional()
    .custom((val) =>
      createEmployeeModel.findOne({ identity: val }).then((employee) => {
        if (employee) {
          return Promise.reject(new Error("employee identity already exists"));
        }
      })
    ),
  check("employeeNumber")
    .optional()
    .custom((val) =>
      createEmployeeModel.findOne({ employeeNumber: val }).then((employee) => {
        if (employee) {
          return Promise.reject(new Error("employee number already exists"));
        }
      })
    ),
  check("email")
    .optional()
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
    .optional()
    .custom((val) =>
      createEmployeeModel.findOne({ phone: val }).then((user) => {
        if (user) {
          return Promise.reject(new Error("رقم الموبايل مستخدم"));
        }
      })
    ),
  MiddlewareValidator,
];
