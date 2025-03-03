const { Router } = require("express");
const { UtilsValidator } = require("../Resuble/UtilsValidationError");

const {
  createSubNestSubCategory,
  getSubNestSubCategories,
  getSubNestSubCategory,
  deleteSubNestSubCategory,
  updateSubNestSubCategory,
} = require("../Services/SubNestSubCategoryService");
const {
  createSubNestSubCategoryValidator,
} = require("../Resuble/SubNestSubCategoryValidatorErrorr");

const Routes = Router();
Routes.route("/")
  .post(createSubNestSubCategoryValidator, createSubNestSubCategory)
  .get(getSubNestSubCategories);
Routes.route("/:id")
  .get(UtilsValidator, getSubNestSubCategory)
  .delete(UtilsValidator, deleteSubNestSubCategory)
  .put(UtilsValidator, updateSubNestSubCategory);
module.exports = Routes;
