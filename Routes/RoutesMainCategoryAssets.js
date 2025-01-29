const { Router } = require("express");

const { protect } = require("../Services/AuthService");
const { UtilsValidator } = require("../Resuble/UtilsValidationError");
const {
  createMainCategoryAssets,
  getMainCategoryAsset,
  deleteMainCategoryAssets,
  updateMainCategoryAssets,
  getMainCategoriesAssets,
} = require("../Services/MainCategoryAssetsService");
const { uploadImage, resizeImage } = require("../Utils/imagesHandler");
const { createAssetsValidator } = require("../Resuble/AssetsValidatorErrorr");

const Routes = Router();
Routes.route("/")
  .post(
    uploadImage,
    createAssetsValidator,
    resizeImage("mainCategoryAssets"),
    createMainCategoryAssets
  )
  .get(getMainCategoriesAssets);
Routes.route("/:id")
  .get(UtilsValidator, getMainCategoryAsset)
  .delete(UtilsValidator, deleteMainCategoryAssets)
  .put(
    uploadImage,
    UtilsValidator,
    resizeImage("mainCategoryAssets"),
    updateMainCategoryAssets
  );
module.exports = Routes;
