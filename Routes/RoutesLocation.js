const { Router } = require("express");

const { UtilsValidator } = require("../Resuble/UtilsValidationError");
const {
  createLocationValidator,
} = require("../Resuble/LocationValidatorErrorr");
const {
  createLocation,
  getLocations,
  getLocation,
  deleteLocation,
  updateLocation,
} = require("../Services/LocationService");
const { getPermissions, permissionMiddleware } = require("../Services/Middleware");
const { buildingMiddleware } = require("../Services/AssetsService");

const Routes = Router();

Routes.route("/")
  .post(getPermissions, createLocationValidator,buildingMiddleware, createLocation)
  .get(getPermissions, getLocations);
Routes.route("/:id")
  .get(permissionMiddleware, UtilsValidator, getLocation)
  .delete(permissionMiddleware, UtilsValidator, deleteLocation)
  .put(permissionMiddleware, UtilsValidator, updateLocation);
module.exports = Routes;
