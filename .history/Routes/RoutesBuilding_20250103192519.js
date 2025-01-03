const { Router } = require("express");

const { protect } = require("../Services/AuthService");
const { UtilsValidator } = require("../Resuble/UtilsValidationError");

const {
  createBuilding,
  getBuildings,
  getBuilding,
  deleteBuilding,
  updateBuilding,
} = require("../Services/BuildingService");

const Routes = Router();
Routes.use(protect);
Routes.route("/")
  .post( createBuilding)
  .get(getBuildings);
Routes.route("/:id")
  .get(UtilsValidator, getBuilding)
  .delete(UtilsValidator, deleteBuilding)
  .put(UtilsValidator, updateBuilding);
module.exports = Routes;
