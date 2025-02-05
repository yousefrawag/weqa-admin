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
const { permissionBuilding } = require("../Services/Middleware");

const Routes = Router();

Routes.route("/")
  .post(
    // permissionBuilding, 
    createLocationValidator, createLocation)
  .get(
    // permissionBuilding,
     getLocations);
Routes.route("/:id")
  .get(
    // permissionBuilding,
     UtilsValidator, getLocation)
  .delete(
    // permissionBuilding,
     UtilsValidator, deleteLocation)
  .put(
    // permissionBuilding,
     UtilsValidator, updateLocation);
module.exports = Routes;
