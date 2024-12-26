const { Router } = require("express");



const { LoginValidator } = require("../Resuble/AuthvalidatorError");
const { Login } = require("../Services/AuthService");
const { limiter } = require("../Services/FactoryHandler");
const { createBuildingValidator } = require("../Resuble/BuildingValidatorErrorr");
const { createBuilding } = require("../Services/BuildingService");
const Routes = Router();

Routes.route("/").post( createBuildingValidator, createBuilding);

module.exports = Routes;
