const { Router } = require("express");

const { protect } = require("../Services/AuthService");
const { UtilsValidator } = require("../Resuble/UtilsValidationError");
const {
  createLocationValidator,
} = require("../Resuble/LocationValidatorErrorr");
const { createLocation, getLocations, getLocation, deleteLocation, updateLocation } = require("../Services/LocationService");
const { permission } = require("../Services/PermissionService");


const Routes = Router();
Routes.route("/")
  .post(permission,createLocationValidator, createLocation)
  .get(permission,getLocations);
Routes.route("/:id")
  .get(permission,UtilsValidator, getLocation)
  .delete(permission,UtilsValidator, deleteLocation)
  .put(permission,UtilsValidator, updateLocation);
module.exports = Routes;
