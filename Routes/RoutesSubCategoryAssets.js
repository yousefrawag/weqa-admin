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
  permission,
  permissionManager,
} = require("../Services/PermissionService");

const Routes = Router();
Routes.route("/")
  .post(
    permissionManager,
    permission,
    uploadImage,
    createSubCategoryAssetsValidator,
    resizeImage("subCategoryAssets"),
    createSubCategoryAssets
  )
  .get(permissionManager, permission, getSubCategoriesAssets);
Routes.route("/:id")
  .get(permissionManager, permission, UtilsValidator, getSubCategoryAsset)
  .delete(
    permissionManager,
    permission,
    UtilsValidator,
    deleteSubCategoryAssets
  )
  .put(
    permissionManager,
    permission,
    uploadImage,
    UtilsValidator,
    resizeImage("subCategoryAssets"),
    updateSubCategoryAssets
  );
module.exports = Routes;
