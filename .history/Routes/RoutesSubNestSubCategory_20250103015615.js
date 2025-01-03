const { Router } = require("express");

const { protect } = require("../Services/AuthService");
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
const { createSubNestSubCategory ,getSubNestSubCategories } = require("../Services/SubNestSubCategoryService");

const Routes = Router();
Routes.use(protect);
Routes.route("/")
  .post(سعلا, createSubNestSubCategory)
  .get(getSubNestSubCategories);
Routes.route("/:id")
  .get(UtilsValidator, getSubCategory)
  .delete(UtilsValidator, deleteSubCategory)
  .put(UtilsValidator, updateSubCategory);
module.exports = Routes;
