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
const { getPermissions } = require("../Services/Middleware");

const Routes = Router();
Routes.route("/")
  .post(getPermissions, createCategoryValidator, createCategory)
  .get(getPermissions, getCategories);
Routes.route("/:id")
  .get(UtilsValidator, getCategory)
  .delete(UtilsValidator, deleteCategory)
  .put(UtilsValidator, updateCategory);
module.exports = Routes;
