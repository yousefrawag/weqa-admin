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
} = require("../Services/LevelsService");
const { protect } = require("../Services/AuthService");
const { UtilsValidator } = require("../Resuble/UtilsValidationError");

const Routes = Router();
Routes.use(protect);
Routes.route("/")
  .post(createBuildingValidator, createLe)
  .get(getBuildings);
Routes.route("/:id")
  .get(UtilsValidator, getBuilding(createBuildingModel))
  .delete(UtilsValidator, deleteBuilding)
  .put(UtilsValidator, updateBuilding);
module.exports = Routes;
