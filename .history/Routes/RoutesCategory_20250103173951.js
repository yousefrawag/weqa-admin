const { Router } = require("express");

const { protect } = require("../Services/AuthService");
const { UtilsValidator } = require("../Resuble/UtilsValidationError");
const {
  getCategories,
  getCategory,
  deleteCategory,
  updateCategory,
  createCategory,
} = require("../Services/CategoryService");

const Routes = Router();
Routes.use(protect);
Routes.route("/").post(createCategoryV , createCategory)
  .get(getCategories);
Routes.route("/:id")
  .get(UtilsValidator, getCategory)
  .delete(UtilsValidator, deleteCategory)
  .put(UtilsValidator, updateCategory);

module.exports = Routes;
