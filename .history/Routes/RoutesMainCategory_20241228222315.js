const { Router } = require("express");

const {
  createMainCategory,
  deleteMainCategory,
  updateMainCategory,
  getLevel,
  getMainCategory,
} = require("../Services/MainCategoryService");
const { protect } = require("../Services/AuthService");
const { UtilsValidator } = require("../Resuble/UtilsValidationError");
const createMainCategoryModel = require("../Models/createMainCategory");
const {
  createMainCategoryValidator,
} = require("../Resuble/MainCategoryValidatorErrorr");

const Routes = Router();
Routes.use(protect);
Routes.route("/")
  .post(createMainCategoryValidator, createMainCategory)
  .get(getMainCategory);
Routes.route("/:id")
  .get(UtilsValidator, getLevel(createMainCategoryModel))
  .delete(UtilsValidator, deleteMainCategory)
  .put(UtilsValidator, updateMainCategory);
module.exports = Routes;
