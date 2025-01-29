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

const Routes = Router();
Routes.route("/")
  .post( createEmployeeValidator, createEmployee)
  .get(getEmployees);
Routes.route("/:id")
  .get(UtilsValidator, getEmployee)
  .delete(UtilsValidator, deleteEmployee)
  .put(updateEmployeeValidator, updateEmployee);
module.exports = Routes;
