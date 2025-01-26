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
const { permission } = require("../Services/PermissionService");

const Routes = Router();
Routes.route("/")
  .post(permission,createSubNestSubCategoryValidator, createSubNestSubCategory)
  .get(permission,getSubNestSubCategories);
Routes.route("/:id")
  .get(permission,UtilsValidator, getSubNestSubCategory)
  .delete(permission,UtilsValidator, deleteSubNestSubCategory)
  .put(permission,UtilsValidator, updateSubNestSubCategory);
module.exports = Routes;
