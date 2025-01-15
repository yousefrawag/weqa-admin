const { Router } = require("express");

const { protect } = require("../Services/AuthService");
const { UtilsValidator } = require("../Resuble/UtilsValidationError");

const { uploadImage, resizeImage } = require("../Utils/imagesHandler");
const {
  createCategoryAssetsValidator,
} = require("../Resuble/AssetsValidatorErrorr");
const {
  createCategoryAssets,
  getCategoriesAssets,
  getCategoryAsset,
  deleteCategoryAssets,
  updateCategoryAssets,
} = require("../Services/CategoryAssetsService");

const Routes = Router();
Routes.use(protect);
Routes.route("/")
  .post(
    uploadImage,
    createCategoryAssetsValidator,
    resizeImage("categoryAssets"),
    createCategoryAssets
  )
  .get(getCategoriesAssets);
Routes.route("/:id")
  .get(UtilsValidator, getCategoryAsset)
  .delete(UtilsValidator, deleteCategoryAssets)
  .put(uploadImage, UtilsValidator, resizeImage("class"), updateCategoryAssets);
module.exports = Routes;
