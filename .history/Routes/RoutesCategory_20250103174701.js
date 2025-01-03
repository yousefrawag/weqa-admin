const { Router } = require("express");
const { protect } = require("../Services/AuthService");
const { UtilsValidator } = require("../Resuble/UtilsValidationError");
const {
  createCategory,
  getCategories,
  getCategory,
  deleteCategory,
  updateCategory,
} = require("../Services/CategoryService");
const {
  createCategoryValidator,
} = require("../Resuble/CategoryValidatorErrorr");
 
const Routes = Router();
Routes.use(protect);


module.exports = Routes;
