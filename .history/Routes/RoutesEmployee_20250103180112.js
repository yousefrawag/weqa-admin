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
const { protect } = require("../Services/AuthService");

const Routes = Router();
Routes.use(protect);

Routes.route("/").post(createEmployeeValidator, createEmployee)
  .get(getEmployees);
Routes.route("/:id")
  .get(UtilsValidator, getEmployee)
  .delete(UtilsValidator, deleteEmployee)
  .put(updateEmployeeValidator, updateEmployee);
module.exports = Routes;
