const { Router } = require("express");

const {
  createLevels,
  deleteLevels,
  updateLevels,
  getLevel,
  getLevels,
} = require("../Services/LevelsService");
const { protect } = require("../Services/AuthService");
const { UtilsValidator } = require("../Resuble/UtilsValidationError");
const createLevelsModel = require("../Models/createLevels");
const { createLevelsValidator } = require("../Resuble/LevelsValidatorErrorr");
const { createSubCategory, getSubCategories, getSubCategory, deleteSubCategory } = require("../Services/SubCategoryService");
const createSubCategoryModel = require("../Models/createSubCategory");

const Routes = Router();
Routes.use(protect);
Routes.route("/")
  .post(createLevelsValidator, createSubCategory)
  .get(getSubCategories);
Routes.route("/:id")
  .get(UtilsValidator, getSubCategory(createSubCategoryModel))
  .delete(UtilsValidator, deleteSubCategory)
  .put(UtilsValidator, updateSu);
module.exports = Routes;
