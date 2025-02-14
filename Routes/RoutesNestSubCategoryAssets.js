const { Router } = require("express");
const { UtilsValidator } = require("../Resuble/UtilsValidationError");

const { uploadImage, resizeImage } = require("../Utils/imagesHandler");
const {
  createNestSubCategoryAssetsValidator,
} = require("../Resuble/AssetsValidatorErrorr");

const {
  getPermissions,
  permissionMiddleware,
} = require("../Services/Middleware");
const {
  createNestSubCategoryAssets,
  getnestSubCategoriesAssets,
  getnestSubCategoryAsset,
  deletenestSubCategoryAssets,
  updatenestSubCategoryAssets,
} = require("../Services/nestSubCategoryAssetsService");

const Routes = Router();
Routes.route("/")
  .post(
    uploadImage,
    createNestSubCategoryAssetsValidator,
    resizeImage("nestSubCategoryAssets"),
    createNestSubCategoryAssets
  )
  .get(getPermissions, getnestSubCategoriesAssets);
Routes.route("/:id")
  .get(permissionMiddleware, UtilsValidator, getnestSubCategoryAsset)
  .delete(permissionMiddleware, UtilsValidator, deletenestSubCategoryAssets)
  .put(
    permissionMiddleware,
    uploadImage,
    UtilsValidator,
    resizeImage("subCategoryAssets"),
    updatenestSubCategoryAssets
  );
module.exports = Routes;
