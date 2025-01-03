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
const { createNestSubCategory } = require("../Services/NestSubCategoryService");

const Routes = Router();
Routes.use(protect);
Routes.route("/")
  .post(createsubCategoryValidator, createNestSubCategory)
  .get(getSubCategories);
Routes.route("/:id")
  .get(UtilsValidator, getSubCategory)
  .delete(UtilsValidator, deleteSubCategory)
  .put(UtilsValidator, updateSubCategory);
module.exports = Routes;
