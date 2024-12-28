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
const createCategoryModel = require("../Models/createCategory");

const Routes = Router();
Routes.use(protect);
Routes.route("/")
  .post(createLevelsValidator, createLevels)
  .get(getLevels);
Routes.route("/:id")
  .get(UtilsValidator, getLevel(createCategoryModel))
  .delete(UtilsValidator, deleteLevels)
  .put(UtilsValidator, updateLevels);
module.exports = Routes;
