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

const Routes = Router();
Routes.route("/")
  .post(
    allowedTo("owner", "manager", "facilitys_manager"),
    createCategoryValidator,
    createCategory
  )
  .get(getCategories);
Routes.route("/:id")
  .get(UtilsValidator, getCategory)
  .delete(UtilsValidator, deleteCategory)
  .put(UtilsValidator, updateCategory);
module.exports = Routes;
