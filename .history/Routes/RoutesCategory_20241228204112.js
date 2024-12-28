const { Router } = require("express");


const { protect } = require("../Services/AuthService");
const { UtilsValidator } = require("../Resuble/UtilsValidationError");
const { createLevelsValidator } = require("../Resuble/LevelsValidatorErrorr");
const createCategoryModel = require("../Models/createCategory");

const Routes = Router();
Routes.use(protect);
Routes.route("/")
  .post(createLevelsValidator, createCa)
  .get(getLevels);
Routes.route("/:id")
  .get(UtilsValidator, getLevel(createCategoryModel))
  .delete(UtilsValidator, deleteLevels)
  .put(UtilsValidator, updateLevels);
module.exports = Routes;
