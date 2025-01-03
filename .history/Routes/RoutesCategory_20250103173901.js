const { Router } = require("express");

const { protect } = require("../Services/AuthService");
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
Routes.use(protect);
Routes.route("/").post
  .get(getCategories);
Routes.route("/:id")
  .get(UtilsValidator, getCategory)
  .delete(UtilsValidator, deleteCategory)
  .put(UtilsValidator, updateCategory);

module.exports = Routes;
