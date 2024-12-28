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
const createMainCategoryModel = require("../Models/createMainCategory");
const {
  createMainCategoryValidator,
} = require("../Resuble/MainCategoryValidatorErrorr");

const Routes = Router();
Routes.use(protect);
Routes.route("/")
  .post(createMainCategoryValidator, createMainCategory)
  .get(getMainCategories);
Routes.route("/:id")
  .get(UtilsValidator, getMainCategory(createMainCategoryModel))
  .delete(UtilsValidator, deleteMainCategory)
  .put(UtilsValidator, updateMainCategory);
module.exports = Routes;
