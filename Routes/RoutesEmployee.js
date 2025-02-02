const { Router } = require("express");
const { UtilsValidator } = require("../Resuble/UtilsValidationError");

const {
  getEmployees,
  getEmployee,
  deleteEmployee,
  updateEmployee,
  createEmployee,
} = require("../Services/EmployeeService");

const Routes = Router();
Routes.route("/")
  .post(  createEmployee)
  .get(getEmployees);
Routes.route("/:id")
  .get(UtilsValidator, getEmployee)
  .delete(UtilsValidator, deleteEmployee)
  .put( updateEmployee);
module.exports = Routes;
