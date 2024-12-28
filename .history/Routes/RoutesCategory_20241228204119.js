const { Router } = require("express");


const { protect } = require("../Services/AuthService");
const { UtilsValidator } = require("../Resuble/UtilsValidationError");
const { createLevelsValidator } = require("../Resuble/LevelsValidatorErrorr");
const createCategoryModel = require("../Models/createCategory");
const { createCategory } = require("../Services/CategoryService");

const Routes = Router();
Routes.use(protect);
Routes.route("/")
  .post(createLevelsValidator, createCategory)
  .get(getCate);
Routes.route("/:id")
  .get(UtilsValidator, getLevel(createCategoryModel))
  .delete(UtilsValidator, deleteLevels)
  .put(UtilsValidator, updateLevels);
module.exports = Routes;
