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
const { getPermissions ,permissionMiddleware} = require("../Services/Middleware");

const Routes = Router();
Routes.route("/")
  .post(
    uploadImage,
    createCategoryAssetsValidator,
    resizeImage("categoryAssets"),
    createCategoryAssets
  )
  .get(getPermissions,getCategoriesAssets);
Routes.route("/:id")
  .get(permissionMiddleware,UtilsValidator, getCategoryAsset)
  .delete(permissionMiddleware,UtilsValidator, deleteCategoryAssets)
  .put(permissionMiddleware,uploadImage, UtilsValidator, resizeImage("category"), updateCategoryAssets);
module.exports = Routes;
