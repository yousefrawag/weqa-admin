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

const Routes = Router();
Routes.route("/")
  .post(
    // allowedTo("facility_manager", "owner", "manager"),

    createBuildingValidator,
    createBuilding
  )
  .get(
    // allowedTo("facility_manager", "owner", "manager"),
   getbuildings);
Routes.route("/:id")
  .get(UtilsValidator, getBuilding)
  .delete(UtilsValidator, deleteBuilding)
  .put(UtilsValidator, updateBuilding);
module.exports = Routes;
