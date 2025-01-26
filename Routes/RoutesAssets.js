const { Router } = require("express");

const { permission } = require("../Services/PermissionService");
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

const Routes = Router();
Routes.route("/")
  .post(permission, uploadPDF, resizeImage, createAssets)
  .get(permission, getAssetss);
Routes.route("/:id")
  .get(permission, UtilsValidator, getAssets)
  .delete(permission, UtilsValidator, deleteAssets)
  .put(permission, uploadPDF, UtilsValidator, resizeImage, updateAssets);
Routes.route("/category/:assetsId").get(permission, getAssetsByCategory);
module.exports = Routes;
