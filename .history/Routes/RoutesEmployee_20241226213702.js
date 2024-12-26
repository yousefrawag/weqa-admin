const { Router } = require("express");
const { createUsersValidator } = require("../Resuble/UsersvalidatorError");
const {
  createUsers,
  getUsers,
  updateUser,
  deleteUser,
  getUser,
  uploadImage,

  updateLoggedUserPassword,
} = require("../Service/UsersService");
const {
  protect,
  allowedTo,
  getLoggedUserData,
} = require("../Service/AuthService");

const { UtilsValidator } = require("../Resuble/UtilsValidationError");
const { createEmployeeValidator } = require("../Resuble/EmployeevalidatorError");
const { createEmployee, getEmployees, getEmployee, deleteEmployee, updateEmployee } = require("../Services/EmployeeService");

const Routes = Router();
Routes.use(protect);

Routes.route("/")
  .post(
    createEmployeeValidator,
    createEmployee
  )
  .get(getEmployees);
Routes.route("/:id")
  .get(UtilsValidator, getEmployee(createEmployee))
  .delete( UtilsValidator, deleteEmployee)
  .put(
    UtilsValidator,
    updateEmployee
  );
module.exports = Routes;
