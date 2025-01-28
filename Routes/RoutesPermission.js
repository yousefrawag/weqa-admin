const { Router } = require("express");
const {
  createPermission,
  getPermission,
  getPermissions,
  updatePermission,
  deletePermission,
} = require("../Services/PermissionService");
const { allowedTo } = require("../Services/AuthService");

const Routes = Router();

Routes.route("/").post(getPermissions);
Routes.route("/:id")
  .get(getPermission)
  .put(updatePermission)
  .delete(deletePermission);

module.exports = Routes;
