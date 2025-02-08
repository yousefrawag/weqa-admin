const { Router } = require("express");

const { UtilsValidator } = require("../Resuble/UtilsValidationError");
const {
  createAssets,
  getAssetss,
  getAssets,
  deleteAssets,
  updateAssets,
  resizeImage,
  getAssetsByCategory,
  resizepdf,
} = require("../Services/AssetsService");
const { uploadPDF, UploadPdfService } = require("../Utils/imagesHandler");
const { permissionBuilding } = require("../Services/Middleware");

const Routes = Router();

Routes.route("/")
  .post(permissionBuilding, UploadPdfService, resizepdf("assets"), createAssets)
  .get(permissionBuilding, getAssetss);
Routes.route("/:id")
  .get(
    // permissionBuilding,
    
    UtilsValidator, getAssets)
  .delete(permissionBuilding, UtilsValidator, deleteAssets)
  .put(
    permissionBuilding,
    UploadPdfService,
    UtilsValidator,
     resizepdf("assets"),
    updateAssets
  );
Routes.route("/category/:assetsId").get(
  // permissionBuilding,
  getAssetsByCategory
);
module.exports = Routes;
