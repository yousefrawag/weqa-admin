const { Router } = require("express");

const { protect } = require("../Services/AuthService");
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
// Routes.use(protect);
Routes.route("/")
  .post(createBuildingValidator, createBuilding)
  .get(getbuildings);
Routes.route("/:id")
  .get(UtilsValidator, getBuilding)
  .delete(UtilsValidator, deleteBuilding)
  .put(UtilsValidator, updateBuilding);
module.exports = Routes;
