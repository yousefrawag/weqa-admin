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
  );

Routes.route("/category/:id").get(getPermissions, getAssetsByCategory);
Routes.route("/status/:id").put(
  allowedTo("owner", "manager", "user", "employee"),
  updateAssetsStatus
);
module.exports = Routes;
