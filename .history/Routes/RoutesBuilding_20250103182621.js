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
const { createBuildingValidator } = require("../Resuble/BuildingValidatorErrorr");
const { createBuilding, getBuildings, getBuilding, deleteBuilding } = require("../Services/BuildingService");

const Routes = Router();
Routes.use(protect);
Routes.route("/")
  .post(createBuildingValidator, createBuilding)
  .get(getBuildings);
Routes.route("/:id")
  .get(UtilsValidator, getBuilding)
  .delete(UtilsValidator, deleteBuilding)
  .put(UtilsValidator, updateCategory);
module.exports = Routes; 
