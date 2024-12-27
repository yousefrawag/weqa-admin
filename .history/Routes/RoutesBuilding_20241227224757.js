const { Router } = require("express");
const {
  createBuildingValidator,
} = require("../Resuble/BuildingValidatorErrorr");
const { createBuilding, getBuildings, deleteBuilding } = require("../Services/BuildingService");
const { protect } = require("../Services/AuthService");
const { UtilsValidator } = require("../Resuble/UtilsValidationError");
const createBuildingModel = require("../Models/createBuilding");
const Routes = Router();
Routes.use(protect);
Routes.route("/")
  .post(createBuildingValidator, createBuilding)
  .get(getBuildings);
  Routes.route("/:id")
  .get(UtilsValidator, getEmployee(createBuildingModel))
  .delete(UtilsValidator, deleteBuilding)
  .put(updateEmployeeValidator, updta);
module.exports = Routes;
