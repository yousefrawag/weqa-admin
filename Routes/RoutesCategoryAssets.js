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
const {
  permission,
  permissionManager,
} = require("../Services/PermissionService");

const Routes = Router();
Routes.route("/")
  .post(
    permissionManager,
    permission,
    uploadImage,
    createCategoryAssetsValidator,
    resizeImage("categoryAssets"),
    createCategoryAssets
  )
  .get(permissionManager, permission, getCategoriesAssets);
Routes.route("/:id")
  .get(permissionManager, permission, UtilsValidator, getCategoryAsset)
  .delete(permissionManager, permission, UtilsValidator, deleteCategoryAssets)
  .put(
    permissionManager,
    permission,
    uploadImage,
    UtilsValidator,
    resizeImage("class"),
    updateCategoryAssets
  );
module.exports = Routes;
