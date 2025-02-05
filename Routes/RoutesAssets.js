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
} = require("../Services/AssetsService");
const { uploadPDF } = require("../Utils/imagesHandler");
const { permissionBuilding } = require("../Services/Middleware");

const Routes = Router();

Routes.route("/")
  .post(
    // permissionBuilding,
    
    uploadPDF, resizeImage, createAssets)
  .get(
    // permissionBuilding,
     getAssetss);
Routes.route("/:id")
  .get(
    // permissionBuilding,
    
    UtilsValidator, getAssets)
  .delete(permissionBuilding, UtilsValidator, deleteAssets)
  .put(
    // permissionBuilding,
    uploadPDF,
    UtilsValidator,
    resizeImage,
    updateAssets
  );
Routes.route("/category/:assetsId").get(
  // permissionBuilding,
  getAssetsByCategory
);
module.exports = Routes;
