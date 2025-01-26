const { Router } = require("express");

const { allowedTo } = require("../Services/AuthService");
const { UtilsValidator } = require("../Resuble/UtilsValidationError");
const {
  createCategory,
  getCategories,
  getCategory,
  deleteCategory,
  updateCategory,
} = require("../Services/CategoryService");
const {
  createCategoryValidator,
} = require("../Resuble/CategoryValidatorErrorr");
const { permission } = require("../Services/PermissionService");

const Routes = Router();
Routes.route("/")
  .post(permission,
    createCategoryValidator,
    createCategory
  )
  .getpermission,(getCategories);
Routes.route("/:id")
  .get(permission,UtilsValidator, getCategory)
  .delete(permission,UtilsValidator, deleteCategory)
  .put(permission,UtilsValidator, updateCategory);
module.exports = Routes;
