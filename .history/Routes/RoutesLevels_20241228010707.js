const { Router } = require("express");
const {
  createBuildingValidator,
} = require("../Resuble/BuildingValidatorErrorr");
const {
  createBuilding,
  getBuildings,
  deleteBuilding,
  updateBuilding,
  getBuilding,
  createLevels,
} = require("../Services/LevelsService");
const { protect } = require("../Services/AuthService");
const { UtilsValidator } = require("../Resuble/UtilsValidationError");
const createLevelsModel = require("../Models/createLevels");

const Routes = Router();
Routes.use(protect);
Routes.route("/")
  .post(createBuildingValidator, createLevels)
  .get(getBuildings);
Routes.route("/:id")
  .get(UtilsValidator, getBuilding(createLevelsModel))
  .delete(UtilsValidator, deleteBuilding)
  .put(UtilsValidator, updateBuilding);
module.exports = Routes;
