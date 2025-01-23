const { Router } = require("express");
const { UtilsValidator } = require("../Resuble/UtilsValidationError");
const {
  createEmployeeValidator,
  updateEmployeeValidator,
} = require("../Resuble/EmployeevalidatorError");
const {
  getEmployees,
  getEmployee,
  deleteEmployee,
  updateEmployee,
  createEmployee,
} = require("../Services/EmployeeService");
const { allowedTo } = require("../Services/AuthService");

const Routes = Router();
Routes.route("/")
  .post(allowedTo("owner", "manager"), createEmployeeValidator, createEmployee)
  .get(getEmployees);
Routes.route("/:id")
  .get(UtilsValidator, getEmployee)
  .delete(UtilsValidator, deleteEmployee)
  .put(updateEmployeeValidator, updateEmployee);
module.exports = Routes;
