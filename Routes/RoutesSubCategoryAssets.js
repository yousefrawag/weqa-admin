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
const { permission } = require("../Services/PermissionService");

const Routes = Router();
Routes.route("/")
  .post(permission,
    uploadImage,
    createSubCategoryAssetsValidator,
    resizeImage("subCategoryAssets"),
    createSubCategoryAssets
  )
  .get(permission,getSubCategoriesAssets);
Routes.route("/:id")
  .get(permission,UtilsValidator, getSubCategoryAsset)
  .delete(permission,UtilsValidator, deleteSubCategoryAssets)
  .put(permission,
    uploadImage,
    UtilsValidator,
    resizeImage("subCategoryAssets"),
    updateSubCategoryAssets
  );
module.exports = Routes;
