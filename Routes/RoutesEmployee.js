const { Router } = require("express");
const { UtilsValidator } = require("../Resuble/UtilsValidationError");
const {
  createEmployeeValidator,
  updateEmployeeValidator,
} = require("../Resuble/EmployeeValidatorError");
const {
  getEmployees,
  getEmployee,
  deleteEmployee,
  updateEmployee,
  createEmployee,
  uploadImage,
  middelwareUpdate,
} = require("../Services/EmployeeService");
const { getPermissions } = require("../Services/Middleware");
const { resizeImage } = require("../Utils/imagesHandler");
const { getLoggedUserData } = require("../Services/AuthService");
const Routes = Router();

Routes.put(
  "/updateMe",
  middelwareUpdate,
  uploadImage,
  resizeImage("user"),
  getLoggedUserData,
  updateEmployee
);
Routes.route("/")
  .post(
    getPermissions,
    uploadImage,
    createEmployeeValidator,
    resizeImage("user"),
    createEmployee
  )
  .get(getPermissions, getEmployees);
Routes.route("/:id")
  .get(
    getPermissions,
    uploadImage,
    UtilsValidator,
    resizeImage("user"),
    getEmployee
  )
  .delete(getPermissions, UtilsValidator, deleteEmployee)
  .put(getPermissions, updateEmployeeValidator, updateEmployee);
module.exports = Routes;
