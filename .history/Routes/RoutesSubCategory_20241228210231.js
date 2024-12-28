const { Router } = require("express");

const { protect } = require("../Services/AuthService");
const { UtilsValidator } = require("../Resuble/UtilsValidationError");
const {  } = require("../Resuble/LevelsValidatorErrorr");
const { createSubCategory, getSubCategories, getSubCategory, deleteSubCategory, updateSubCategory } = require("../Services/SubCategoryService");
const createSubCategoryModel = require("../Models/createSubCategory");
const { createsubCategoryValidator } = require("../Resuble/subCategoryValidatorErrorr");

const Routes = Router();
Routes.use(protect);
Routes.route("/")
  .post(createsubCategoryValidator, createSubCategory)
  .get(getSubCategories);
Routes.route("/:id")
  .get(UtilsValidator, getSubCategory(createSubCategoryModel))
  .delete(UtilsValidator, deleteSubCategory)
  .put(UtilsValidator, updateSubCategory);
module.exports = Routes;
