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
const { permissionEmployee } = require("../Services/Middleware");
const Routes = Router();
Routes.route("/")
  .post(
    // permissionEmployee,
     createEmployeeValidator, createEmployee)
  .get(
    // permissionEmployee, 
    getEmployees);
Routes.route("/:id")
  .get(
    // permissionEmployee,
     UtilsValidator, getEmployee)
  .delete(
    // permissionEmployee,
     UtilsValidator, deleteEmployee)
  .put(
    // permissionEmployee,
     updateEmployeeValidator, updateEmployee);
module.exports = Routes;
