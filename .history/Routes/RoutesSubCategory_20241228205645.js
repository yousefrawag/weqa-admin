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
const { createSubCategory } = require("../Services/SubCategoryService");

const Routes = Router();
Routes.use(protect);
Routes.route("/")
  .post(createLevelsValidator, createSubCategory)
  .get(getSubCat);
Routes.route("/:id")
  .get(UtilsValidator, getLevel(createLevelsModel))
  .delete(UtilsValidator, deleteLevels)
  .put(UtilsValidator, updateLevels);
module.exports = Routes;
