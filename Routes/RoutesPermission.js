const { Router } = require("express");
const {
  createPermission,
  getPermission,
  getPermissions,
  updatePermission,
  deletePermission,
} = require("../Services/PermissionService");

const Routes = Router();

Routes.route("/").post(createPermission).get(getPermissions);
Routes.route("/:id")
  .get(getPermission)
  .put(updatePermission)
  .delete(deletePermission);

module.exports = Routes;
