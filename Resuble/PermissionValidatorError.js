const { check, body } = require("express-validator");
const { default: slugify } = require("slugify");

const {
  MiddlewareValidator,
} = require("../Middlewares/MiddlewareValidatorError");
const createPermissionModel = require("../Models/createPermission");

exports.createPermissionValidator = [
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
  MiddlewareValidator,
];

exports.updatePermissionValidator = [
  check("id").isMongoId().withMessage("Not a valid PermissionID"),
  check("username")
    .optional()
    .custom((val, { req }) => {
      req.body.slug = slugify(val);
      return true;
    }),

  check("identity")
    .optional()
    .custom((val) =>
      createPermissionModel.findOne({ identity: val }).then((Permission) => {
        if (Permission) {
          return Promise.reject(
            new Error("Permission identity already exists")
          );
        }
      })
    ),
  check("PermissionNumber")
    .optional()
    .custom((val) =>
      createPermissionModel
        .findOne({ PermissionNumber: val })
        .then((Permission) => {
          if (Permission) {
            return Promise.reject(
              new Error("Permission number already exists")
            );
          }
        })
    ),
  check("email")
    .optional()
    .isEmail()
    .withMessage("Must be at E-mail Address")
    .custom((val) =>
      createPermissionModel.findOne({ email: val }).then((user) => {
        if (user) {
          return Promise.reject(new Error("Permission Email already exists"));
        }
      })
    ),
  check("phone")
    .optional()
    .custom((val) =>
      createPermissionModel.findOne({ phone: val }).then((user) => {
        if (user) {
          return Promise.reject(new Error("رقم الموبايل مستخدم"));
        }
      })
    ),
  MiddlewareValidator,
];
