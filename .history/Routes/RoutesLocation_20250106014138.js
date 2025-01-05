const { Router } = require("express");

const { protect } = require("../Services/AuthService");
const { UtilsValidator } = require("../Resuble/UtilsValidationError");
const {
  createLocationValidator,
} = require("../Resuble/LocationValidatorErrorr");
const { createLocation } = require("../Services/LocationService");


const Routes = Router();
Routes.use(protect);
Routes.route("/")
  .post(createLocationValidator, createLocation)
  .get(getLocation);
Routes.route("/:id")
  .get(UtilsValidator, getLocation)
  .delete(UtilsValidator, deleteLocation)
  .put(UtilsValidator, updateLocation);
module.exports = Routes;
