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
const { getPermissions,permissionMiddleware } = require("../Services/Middleware");

const Routes = Router();
Routes.route("/")
  .post(getPermissions,createBuildingValidator, createBuilding)
  .get(getPermissions, getbuildings);
Routes.route("/:id")
  .get(permissionMiddleware, UtilsValidator, getBuilding)
  .delete(permissionMiddleware, UtilsValidator, deleteBuilding)
  .put(permissionMiddleware, UtilsValidator, updateBuilding);
module.exports = Routes;
