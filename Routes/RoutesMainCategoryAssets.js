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
const { permissionCategory } = require("../Services/Middleware");

const Routes = Router();
Routes.route("/")
  .post(
    permissionCategory,
    uploadImage,
    createAssetsValidator,
    resizeImage("mainCategoryAssets"),
    createMainCategoryAssets
  )
  .get(permissionCategory, getMainCategoriesAssets);
Routes.route("/:id")
  .get(permissionCategory, UtilsValidator, getMainCategoryAsset)
  .delete(permissionCategory, UtilsValidator, deleteMainCategoryAssets)
  .put(
    permissionCategory,
    uploadImage,
    permissionCategory,
    UtilsValidator,
    resizeImage("mainCategoryAssets"),
    updateMainCategoryAssets
  );
module.exports = Routes;
