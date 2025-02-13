const { Router } = require("express");

const { UtilsValidator } = require("../Resuble/UtilsValidationError");
const {
  createSubCategory,
  getSubCategories,
  getSubCategory,
  deleteSubCategory,
  updateSubCategory,
} = require("../Services/SubCategoryService");
const {
  createsubCategoryValidator,
} = require("../Resuble/subCategoryValidatorErrorr");
const { allowedTo } = require("../Services/AuthService");

const Routes = Router();
// Routes.use(allowedTo("owner", "manager", "facilitys_manager"));
Routes.route("/")
  .post(createsubCategoryValidator, createSubCategory)
  .get(getSubCategories);
Routes.route("/:id")
  .get(UtilsValidator, getSubCategory)
  .delete(UtilsValidator, deleteSubCategory)
  .put(UtilsValidator, updateSubCategory);
module.exports = Routes;
