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
const { permission } = require("../Services/PermissionService");

const Routes = Router();
Routes.route("/")
  .post(permission,
    uploadImage,
    createCategoryAssetsValidator,
    resizeImage("categoryAssets"),
    createCategoryAssets
  )
  .get(permission,getCategoriesAssets);
Routes.route("/:id")
  .get(permission,UtilsValidator, getCategoryAsset)
  .delete(permission,UtilsValidator, deleteCategoryAssets)
  .put(permission,uploadImage, UtilsValidator, resizeImage("class"), updateCategoryAssets);
module.exports = Routes;
