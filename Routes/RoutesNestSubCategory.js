const { Router } = require("express");
const { UtilsValidator } = require("../Resuble/UtilsValidationError");
const {
  createNestSubCategory,
  getNestSubCategories,
  deleteNestSubCategory,
  updateNestSubCategory,
  getNestSubCategory,
} = require("../Services/NestSubCategoryService");
const {
  createNestsubCategoryValidator,
} = require("../Resuble/NestSubCategoryValidatorErrorr");
const { allowedTo } = require("../Services/AuthService");
const Routes = Router();
Routes.route("/")
  .post(
    // allowedTo("owner", "manager", "facilitys_manager"),
    
    createNestsubCategoryValidator,
    createNestSubCategory
  )
  .get( getNestSubCategories);
Routes.route("/:id")
  .get( UtilsValidator, getNestSubCategory)
  .delete( UtilsValidator, deleteNestSubCategory)
  .put( UtilsValidator, updateNestSubCategory);
module.exports = Routes;
