const { Router } = require("express");
const {
  createPermission,
  getPermission,
  getPermissions,
  updatePermission,
  deletePermission,
} = require("../Services/PermissionService");
const { permissionEmployee } = require("../Services/Middleware");

const Routes = Router();

Routes.route("/")
  .post(
    // permissionEmployee, 
    createPermission)
  .get(
    // permissionEmployee, 
    getPermissions);
Routes.route("/:id")
  .get(
    // permissionEmployee,
     getPermission)
  .put(
    // permissionEmployee,
     updatePermission)
  .delete(
    // permissionEmployee,
     deletePermission);

module.exports = Routes;
