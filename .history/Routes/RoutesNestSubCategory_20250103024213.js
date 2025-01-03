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
  
const { createNestSubCategory, getNestSubCategories ,getNestSubCategory, deleteNestSubCategory  } = require("../Services/NestSubCategoryService");
const { createNestsubCategoryValidator } = require("../Resuble/nestSubCategoryValidatorErrorr copy");

const Routes = Router();
Routes.use(protect);
Routes.route("/")
  .post(createNestsubCategoryValidator, createNestSubCategory)
  .get(getNestSubCategories);
Routes.route("/:id")
  .get(UtilsValidator, getNestSubCategories)
  .delete(UtilsValidator, deleteNestSubCategory)
  .put(UtilsValidator, updateSubCategory);
module.exports = Routes;
