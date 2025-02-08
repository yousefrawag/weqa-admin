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
const {
  createSubCategoryAssetsValidator,
} = require("../Resuble/AssetsValidatorErrorr");
const {
  createSubCategoryAssets,
  getSubCategoryAsset,
  getSubCategoriesAssets,
  deleteSubCategoryAssets,
  updateSubCategoryAssets,
} = require("../Services/SubCategoryAssetsService");
const {
  getPermissions,
  permissionMiddleware,
} = require("../Services/Middleware");

const Routes = Router();
Routes.route("/")
  .post(
    uploadImage,
    createSubCategoryAssetsValidator,
    resizeImage("subCategoryAssets"),
    createSubCategoryAssets
  )
  .get(getPermissions, getSubCategoriesAssets);
Routes.route("/:id")
  .get(permissionMiddleware, UtilsValidator, getSubCategoryAsset)
  .delete(permissionMiddleware, UtilsValidator, deleteSubCategoryAssets)
  .put(
    permissionMiddleware,
    uploadImage,
    UtilsValidator,
    resizeImage("subCategoryAssets"),
    updateSubCategoryAssets
  );
module.exports = Routes;
