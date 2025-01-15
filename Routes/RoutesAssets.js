const { Router } = require("express");

const { protect } = require("../Services/AuthService");
const { UtilsValidator } = require("../Resuble/UtilsValidationError");
const {
  createAssets,
  getAssetss,
  getAssets,
  deleteAssets,
  updateAssets,
} = require("../Services/AssetsService");
const { uploadImage, resizeImage } = require("../Utils/imagesHandler");

const Routes = Router();
Routes.use(protect);
Routes.route("/")
  .post(uploadImage, resizeImage("assets"), createAssets)
  .get(getAssetss);
Routes.route("/:id")
  .get(UtilsValidator, getAssets)
  .delete(UtilsValidator, deleteAssets)
  .put(uploadImage, UtilsValidator, resizeImage("assets"), updateAssets);

module.exports = Routes;
