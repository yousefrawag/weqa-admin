const { Router } = require("express");
const {
  createBuildingValidator,
} = require("../Resuble/BuildingValidatorErrorr");
const { createBuilding } = require("../Services/BuildingService");
const Routes = Router();

Routes.route("/").post(createBuildingValidator, createBuilding).get;

module.exports = Routes;
