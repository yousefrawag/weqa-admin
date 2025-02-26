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
  acceptUpdateEmployee,
} = require("../Services/EmployeeService");
const { getPermissions } = require("../Services/Middleware");
const { resizeImage } = require("../Utils/imagesHandler");
const {
  getLoggedUserData,
  updateLoggedUserPassword,
  protect,
} = require("../Services/AuthService");
const Routes = Router();

Routes.put(
  "/updateMe",
  uploadImage,
  resizeImage("user"),
  getLoggedUserData,
  updateEmployee
);
Routes.put(
  "/changeEmployeePassword",
  protect,
  getLoggedUserData,
  updateLoggedUserPassword
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
Routes.route("/status/:id").put(acceptUpdateEmployee);
Routes.route("/:id")
  .get(
    getPermissions,
    uploadImage,
    UtilsValidator,
    resizeImage("user"),
    getEmployee
  )
  .delete(getPermissions, UtilsValidator, deleteEmployee)


module.exports = Routes;
