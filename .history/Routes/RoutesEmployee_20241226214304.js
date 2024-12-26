const { Router } = require("express");
const { UtilsValidator } = require("../Resuble/UtilsValidationError");
const {
  createEmployeeValidator,
} = require("../Resuble/EmployeevalidatorError");
const {
  getEmployees,
  getEmployee,
  deleteEmployee,
  updateEmployee,
} = require("../Services/EmployeeService");
const { protect } = require("../Services/AuthService");
const createEmployeeModel = require("../Models/createEmployee");

const Routes = Router();
Routes.use(protect);

Routes.route("/")
  .post(createEmployeeValidator, createEmployee)
  .get(getEmployees);
Routes.route("/:id")
  .get(UtilsValidator, getEmployee(createEmployeeModel))
  .delete(UtilsValidator, deleteEmployee)
  .put(UtilsValidator, updateEmployee);
module.exports = Routes;
