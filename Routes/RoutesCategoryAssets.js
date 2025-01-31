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
const { permissionCategory } = require("../Services/Middleware");

const Routes = Router();
Routes.route("/")
  .post(
    uploadImage,
    createCategoryAssetsValidator,
    resizeImage("categoryAssets"),
    createCategoryAssets
  )
  .get(getCategoriesAssets);
Routes.route("/:id")
  .get(permissionCategory,UtilsValidator, getCategoryAsset)
  .delete(permissionCategory,UtilsValidator, deleteCategoryAssets)
  .put(permissionCategory,uploadImage, UtilsValidator, resizeImage("class"), updateCategoryAssets);
module.exports = Routes;
