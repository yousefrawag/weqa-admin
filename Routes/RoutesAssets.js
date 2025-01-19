const { Router } = require("express");

const { protect } = require("../Services/AuthService");
const { UtilsValidator } = require("../Resuble/UtilsValidationError");
const {
  createAssets,
  getAssetss,
  getAssets,
  deleteAssets,
  updateAssets,
  resizeImage,
} = require("../Services/AssetsService");
const { uploadPDF } = require("../Utils/imagesHandler");

const Routes = Router();
// Routes.use(protect);
Routes.route("/").post(uploadPDF, resizeImage, createAssets).get(getAssetss);
Routes.route("/:id")
  .get(UtilsValidator, getAssets)
  .delete(UtilsValidator, deleteAssets)
  .put(uploadPDF, UtilsValidator, resizeImage, updateAssets);

module.exports = Routes;
