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
const {
  getPermissions,
  permissionMiddleware,
} = require("../Services/Middleware");

const Routes = Router();
Routes.route("/")
  .post(
    getPermissions,
    uploadImage,
    createAssetsValidator,
    resizeImage("mainCategoryAssets"),
    createMainCategoryAssets
  )
  .get(getPermissions, getMainCategoriesAssets);
Routes.route("/:id")
  .get(permissionMiddleware, UtilsValidator, getMainCategoryAsset)
  .delete(permissionMiddleware, UtilsValidator, deleteMainCategoryAssets)
  .put(
    permissionMiddleware,
    uploadImage,
    UtilsValidator,
    resizeImage("mainCategoryAssets"),
    updateMainCategoryAssets
  );
module.exports = Routes;
