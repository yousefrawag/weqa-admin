const { Router } = require("express");

const {
  createMainCategory,
  deleteMainCategory,
  updateMainCategory,
  getMainCategory,
  getMainCategories,
} = require("../Services/MainCategoryService");
const { protect } = require("../Services/AuthService");
const { UtilsValidator } = require("../Resuble/UtilsValidationError");
const {
  createMainCategoryValidator,
} = require("../Resuble/MainCategoryValidatorErrorr");

const Routes = Router();
Routes.use(protect);
Routes.route("/")
  .post(createMainCategoryValidator, createMainCategory)
  .get(getMainCategories);
  Routes.route("/")
Routes.route("/:id")
  .get(UtilsValidator, getMainCategory)
  .delete(UtilsValidator, deleteMainCategory)
  .put(UtilsValidator, updateMainCategory);
module.exports = Routes;
