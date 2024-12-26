const { Router } = require("express");
const {
  createBuildingValidator,
} = require("../Resuble/BuildingValidatorErrorr");
const { createBuilding, getBuildings } = require("../Services/BuildingService");
const Routes = Router();

Routes.route("/").post(createBuildingValidator, createBuilding).get(getBuildings);

module.exports = Routes;
