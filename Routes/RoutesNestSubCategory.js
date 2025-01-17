const { Router } = require("express");

const { protect } = require("../Services/AuthService");
const { UtilsValidator } = require("../Resuble/UtilsValidationError");
const {
  createNestSubCategory,
  getNestSubCategories,
  deleteNestSubCategory,
  updateNestSubCategory,
  getNestSubCategory,
} = require("../Services/NestSubCategoryService");
const { createNestsubCategoryValidator } = require("../Resuble/NestSubCategoryValidatorErrorr");


const Routes = Router();
// Routes.use(protect);
Routes.route("/")
  .post(createNestsubCategoryValidator, createNestSubCategory)
  .get(getNestSubCategories);
Routes.route("/:id")
  .get(UtilsValidator, getNestSubCategory)
  .delete(UtilsValidator, deleteNestSubCategory)
  .put(UtilsValidator, updateNestSubCategory);
module.exports = Routes;
