const { Router } = require("express");
const {
  createPermission,

  updatePermission,
  deletePermission,
  getPermissionsService,
  getPermissionService,
} = require("../Services/PermissionService");
const { getPermissions } = require("../Services/Middleware");
const { protect } = require("../Services/AuthService");

const Routes = Router();
Routes.use(protect);
Routes.route("/")
  .post(createPermission)
  .get(getPermissions, getPermissionsService);
Routes.route("/:id")
  .get(getPermissions, getPermissionService)
  .put(getPermissions, updatePermission)
  .delete(getPermissions, deletePermission);

module.exports = Routes;
