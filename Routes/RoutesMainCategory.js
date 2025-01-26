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
const { permission } = require("../Services/PermissionService");

const Routes = Router();
Routes.route("/")
  .post(permission,
    allowedTo("owner", "manager", "facilitys_manager"),
    createMainCategoryValidator,
    createMainCategory
  )
  .get(permission,getMainCategories);
Routes.route("/:id")
  .get(permission,UtilsValidator, getMainCategory)
  .delete(permission,UtilsValidator, deleteMainCategory)
  .put(permission,UtilsValidator, updateMainCategory);
module.exports = Routes;
