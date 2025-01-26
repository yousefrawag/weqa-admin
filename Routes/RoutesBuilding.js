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
const { permission } = require("../Services/PermissionService");

const Routes = Router();
Routes.route("/")
  .post(
    allowedTo("facility_manager", "owner", "manager"),
    permission,
    createBuildingValidator,
    createBuilding
  )
  .get(allowedTo("facility_manager", "owner", "manager"),permission,getbuildings);
Routes.route("/:id")
  .get(permission,UtilsValidator, getBuilding)
  .delete(permission,UtilsValidator, deleteBuilding)
  .put(permission,UtilsValidator, updateBuilding);
module.exports = Routes;
