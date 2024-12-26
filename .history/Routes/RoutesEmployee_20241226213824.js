const { Router } = require("express");
const { UtilsValidator } = require("../Resuble/UtilsValidationError");
const {
  createEmployeeValidator,
} = require("../Resuble/EmployeevalidatorError");
const {
  createEmployee,
  getEmployees,
  getEmployee,
  deleteEmployee,
  updateEmployee,
} = require("../Services/EmployeeService");

const Routes = Router();
Routes.use(prote);

Routes.route("/")
  .post(createEmployeeValidator, createEmployee)
  .get(getEmployees);
Routes.route("/:id")
  .get(UtilsValidator, getEmployee(createEmployee))
  .delete(UtilsValidator, deleteEmployee)
  .put(UtilsValidator, updateEmployee);
module.exports = Routes;
