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
} = require("../Services/AssetsService");
const { UploadPdfService } = require("../Utils/imagesHandler");
const { getPermissions,permissionMiddleware } = require("../Services/Middleware");

const Routes = Router();

Routes.route("/")
  .post(getPermissions, UploadPdfService, resizepdf("assets"), createAssets)
  .get(getPermissions, getAssetss);
Routes.route("/:id")
  .get(permissionMiddleware, UtilsValidator, getAssets)
  .delete(permissionMiddleware, UtilsValidator, deleteAssets)
  .put(
    permissionMiddleware,
    UploadPdfService,
    UtilsValidator,
    resizepdf("assets"),
    updateAssets
  );
Routes.route("/category/:id").get(getPermissions, getAssetsByCategory);
module.exports = Routes;
