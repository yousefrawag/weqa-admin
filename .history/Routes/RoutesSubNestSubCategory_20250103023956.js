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

const { createSubNestSubCategory ,getSubNestSubCategories, getSubNestSubCategory } = require("../Services/SubNestSubCategoryService");
const { createSubNestSubCategoryValidator } = require("../Resuble/SubNestSubCategoryValidatorErrorr");

const Routes = Router();
Routes.use(protect);
Routes.route("/")
  .post(createSubNestSubCategoryValidator, createSubNestSubCategory)
  .get(getSubNestSubCategories);
Routes.route("/:id")
  .get(UtilsValidator, getSubNestSubCategory)
  .delete(UtilsValidator, deleteSubCategory)
  .put(UtilsValidator, updateSubCategory);
module.exports = Routes;
