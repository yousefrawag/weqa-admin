const { check } = require("express-validator");
const { default: slugify } = require("slugify");

const {
  MiddlewareValidator,
} = require("../Middlewares/MiddlewareValidatorError");
const createMainCategoryAssetsModel = require("../Models/createMainCategoryAssets");
const createCategoryAssetsModel = require("../Models/createCategoryAssets");
const createSubCategoryAssetsModel = require("../Models/createSubCategoryAssets");

exports.createAssetsValidator = [
  check("name")
    .notEmpty()
    .withMessage("required MainCategoryAssets Name")
    .custom((val, { req }) => {
      req.body.slug = slugify(val);
      return true;
    }),
  MiddlewareValidator,
];
exports.createCategoryAssetsValidator = [
  check("name")
    .notEmpty()
    .withMessage("required MainCategoryAssets Name")
    .custom((val, { req }) => {
      req.body.slug = slugify(val);
      return true;
    }),
  check("mainCategoryAssets")
    .notEmpty()
    .withMessage("required MainCategoryAssets Name")
    .custom((val, { req }) => {
      createMainCategoryAssetsModel.findById(val).then((res) => {
        if (!res) {
          throw new Error("الفئة غير موجودة");
        }
      });
      return true;
    }),
  MiddlewareValidator,
];
exports.createSubCategoryAssetsValidator = [
  check("name")
    .notEmpty()
    .withMessage("required SubCategoryAssets Name")
    .custom((val, { req }) => {
      req.body.slug = slugify(val);
      return true;
    }),
  check("categoryAssets")
    .notEmpty()
    .withMessage("required CategoryAssets Name")
    .custom((val, { req }) => {
      createCategoryAssetsModel.findById(val).then((res) => {
        if (!res) {
          throw new Error("الفئة غير موجودة");
        }
      });
      return true;
    }),
  MiddlewareValidator,
];
exports.createNestSubCategoryAssetsValidator = [
  check("name")
    .notEmpty()
    .withMessage("required SubCategoryAssets Name")
    .custom((val, { req }) => {
      req.body.slug = slugify(val);
      return true;
    }),
  check("subCategoryAssets")
    .notEmpty()
    .withMessage("required subCategoryAssets Name")
    .custom((val, { req }) => {
      createSubCategoryAssetsModel.findById(val).then((res) => {
        if (!res) {
          throw new Error("الفئة غير موجودة");
        }
      });
      return true;
    }),
  MiddlewareValidator,
];
