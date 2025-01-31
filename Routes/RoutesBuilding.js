const { Router } = require("express");

const { protect, allowedTo } = require("../Services/AuthService");
const { UtilsValidator } = require("../Resuble/UtilsValidationError");
const {
  createBuildingValidator,
} = require("../Resuble/BuildingValidatorErrorr");
const {
  createBuilding,
  getBuilding,
  deleteBuilding,
  updateBuilding,
  getbuildings,
} = require("../Services/BuildingService");
const { permissionBuilding } = require("../Services/Middleware");

const Routes = Router();
Routes.route("/")
  .post(createBuildingValidator, createBuilding)
  .get(permissionBuilding, getbuildings);
Routes.route("/:id")
  .get(permissionBuilding, UtilsValidator, getBuilding)
  .delete(permissionBuilding, UtilsValidator, deleteBuilding)
  .put(permissionBuilding, UtilsValidator, updateBuilding);
module.exports = Routes;
