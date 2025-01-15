const { Router } = require("express");

const { protect } = require("../Services/AuthService");
const { UtilsValidator } = require("../Resuble/UtilsValidationError");
const {
  createMainCategoryAssets,
  getMainCategoryAsset,
  deleteMainCategoryAssets,
  updateMainCategoryAssets,
  getMainCategoriesAssets,
  getRoomForAssetLocation,
} = require("../Services/MainCategoryAssetsService");

const Routes = Router();
// Routes.use(protect);
Routes.route("/").post(createMainCategoryAssets).get(getMainCategoriesAssets);
Routes.route("/:id")
  .get(UtilsValidator, getMainCategoryAsset)
  .delete(UtilsValidator, deleteMainCategoryAssets)
  .put(UtilsValidator, updateMainCategoryAssets);
  Routes.route("/locationAssets/:id").get(getRoomForAssetLocation)
module.exports = Routes;
