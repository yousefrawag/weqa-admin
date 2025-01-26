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
const { permission } = require("../Services/PermissionService");
const Routes = Router();
Routes.route("/")
  .post(
    allowedTo("owner", "manager", "facilitys_manager"),
    permission,
    createNestsubCategoryValidator,
    createNestSubCategory
  )
  .get(permission, getNestSubCategories);
Routes.route("/:id")
  .get(permission, UtilsValidator, getNestSubCategory)
  .delete(permission, UtilsValidator, deleteNestSubCategory)
  .put(permission, UtilsValidator, updateNestSubCategory);
module.exports = Routes;
