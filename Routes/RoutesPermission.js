const { Router } = require("express");
const { createPermission } = require("../Services/PermissionService");


const Routes = Router();
Routes.route("/:employee").post(createPermission);

module.exports = Routes;
