const { Router } = require("express");
const { UtilsValidator } = require("../Resuble/UtilsValidationError");
const {
  createEmployeeValidator,
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
  allowedTo,
} = require("../Services/AuthService");
const Routes = Router();

Routes.put(
  "/updateMe",
  getLoggedUserData,
  uploadImage,
  resizeImage("user"),
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
    
    resizeImage("user"),
    createEmployee
  )
  .get(getPermissions, getEmployees);
Routes.route("/status/:id").put(acceptUpdateEmployee);
Routes.route("/:id")
  .get(getPermissions, UtilsValidator, getEmployee)
  .put(
    allowedTo("onwer", "manager", "employee"),
    uploadImage,
    UtilsValidator,
    resizeImage("user"),
    updateEmployee
  )
  .delete(getPermissions, UtilsValidator, deleteEmployee);

module.exports = Routes;