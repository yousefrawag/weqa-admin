const { Router } = require("express");
const { UtilsValidator } = require("../Resuble/UtilsValidationError");

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
  .put(
    allowedTo("onwer", "manager", "employee"),
    UtilsValidator,
    updateEmployee
  )
  .delete(getPermissions, UtilsValidator, deleteEmployee);

module.exports = Routes;
