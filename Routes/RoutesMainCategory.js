const { Router } = require("express");

const {
  createMainCategory,
  deleteMainCategory,
  updateMainCategory,
  getMainCategory,
  getMainCategories,
} = require("../Services/MainCategoryService");
const {  allowedTo } = require("../Services/AuthService");
const { UtilsValidator } = require("../Resuble/UtilsValidationError");
const {
  createMainCategoryValidator,
} = require("../Resuble/MainCategoryValidatorErrorr");

const Routes = Router();
Routes.route("/")
  .post(
    allowedTo("owner", "manager", "facilitys_manager"),
    createMainCategoryValidator,
    createMainCategory
  )
  .get(getMainCategories);
Routes.route("/:id")
  .get(UtilsValidator, getMainCategory)
  .delete(UtilsValidator, deleteMainCategory)
  .put(UtilsValidator, updateMainCategory);
module.exports = Routes;
