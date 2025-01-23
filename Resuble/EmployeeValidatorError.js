const { check, body } = require("express-validator");
const { default: slugify } = require("slugify");

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

  check("building").custom((value, { req }) => {
    const exemptRoles = [
      "owner",
      "manager",
      "facilitys_manager",
      "safety_manager",
      "security_manager",
      "contracts_manager",
    ];

    if (exemptRoles.includes(req.body.role)) {
      return true;
    }

    if (!value) {
      throw new Error("The building field is required for this role.");
    }
    if (!/^[0-9a-fA-F]{24}$/.test(value)) {
      throw new Error("Invalid building ID format.");
    }
    return true;
  }),
  check("continued")
    .custom((value, { req }) => {
      const exemptRoles = [
        "owner",
        "manager",
        "facilitys_manager",
        "safety_manager",
        "security_manager",
        "contracts_manager",
      ];

      if (exemptRoles.includes(req.body.role)) {
        return true;
      }

      if (!value) {
        throw new Error("The continued field is required for this role.");
      }
      return true;
    })
    .bail()
    .isIn(["building", "location", "assets"])
    .withMessage(
      "The continued field must be one of: building, location, assets."
    ),
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
