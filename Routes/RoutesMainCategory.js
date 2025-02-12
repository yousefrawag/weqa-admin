const { Router } = require("express");

const {
  createMainCategory,
  deleteMainCategory,
  updateMainCategory,
  getMainCategory,
  getMainCategories,
} = require("../Services/MainCategoryService");
const { allowedTo } = require("../Services/AuthService");
const { UtilsValidator } = require("../Resuble/UtilsValidationError");
const {
  createMainCategoryValidator,
} = require("../Resuble/MainCategoryValidatorErrorr");
const { getPermissions } = require("../Services/Middleware");

const Routes = Router();
Routes.route("/")
  .post(
    getPermissions,
    allowedTo("owner", "manager", "facilitys_manager"),
    createMainCategoryValidator,
    createMainCategory
  )
  .get(getPermissions, getMainCategories);
Routes.route("/:id")
  .get(getPermissions,UtilsValidator, getMainCategory)
  .delete(getPermissions, UtilsValidator, deleteMainCategory)
  .put(getPermissions, UtilsValidator, updateMainCategory);
module.exports = Routes;
