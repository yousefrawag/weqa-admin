const { Router } = require("express");

const { UtilsValidator } = require("../Resuble/UtilsValidationError");
const {
  createAssets,
  getAssetss,
  getAssets,
  deleteAssets,
  updateAssets,
  getAssetsByCategory,
  resizepdf,
  updateAssetsStatus,
  buildingMiddleware,
  deleteAssetsStatus,
} = require("../Services/AssetsService");
const { UploadPdfService } = require("../Utils/imagesHandler");
const {
  getPermissions,
  permissionMiddleware,
} = require("../Services/Middleware");
const { allowedTo } = require("../Services/AuthService");

const Routes = Router();

Routes.route("/")
  .post(
    getPermissions,
    UploadPdfService,
    resizepdf("assets"),
    buildingMiddleware,
    createAssets
  )
  .get(getPermissions, getAssetss);
Routes.route("/:id")
  .get(permissionMiddleware, UtilsValidator, getAssets)
  .put(
    permissionMiddleware,
    UploadPdfService,
    UtilsValidator,
    resizepdf("assets"),
    updateAssets
  )
  .delete(allowedTo("owner", "employee"), getPermissions, deleteAssets);
Routes.route("/request/:id").put(
  permissionMiddleware,
  UtilsValidator,
  deleteAssetsStatus
);
// Routes.route("/delete/:id").get("owner", deleteAssets);
Routes.route("/category/:id").get(getPermissions, getAssetsByCategory);
Routes.route("/status/:id").put(allowedTo("owner"), updateAssetsStatus);
module.exports = Routes;
