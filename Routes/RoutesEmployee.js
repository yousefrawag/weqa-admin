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
} = require("../Services/EmployeeService");
const { getPermissions,permissionMiddleware } = require("../Services/Middleware");
const Routes = Router();
Routes.route("/")
  .post(getPermissions, createEmployeeValidator, createEmployee)
  .get(getPermissions, getEmployees);
Routes.route("/:id")
  .get(getPermissions, UtilsValidator, getEmployee)
  .delete(getPermissions, UtilsValidator, deleteEmployee)
  .put(getPermissions, updateEmployeeValidator, updateEmployee);
module.exports = Routes;
