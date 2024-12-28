const { Router } = require("express");


const { protect } = require("../Services/AuthService");
const { UtilsValidator } = require("../Resuble/UtilsValidationError");
const { createLevelsValidator } = require("../Resuble/LevelsValidatorErrorr");
const createCategoryModel = require("../Models/createCategory");
const { createCategory, getCategories, getCategory } = require("../Services/CategoryService");

const Routes = Router();
Routes.use(protect);
Routes.route("/")
  .post(createLevelsValidator, createCategory)
  .get(getCategories);
Routes.route("/:id")
  .get(UtilsValidator, getCategory(createCategoryModel))
  .delete(UtilsValidator, deleteLevels)
  .put(UtilsValidator, updateLevels);
module.exports = Routes;
