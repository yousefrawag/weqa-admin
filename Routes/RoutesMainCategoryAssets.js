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
const { permission } = require("../Services/PermissionService");

const Routes = Router();
Routes.route("/")
  .post(permission,
    uploadImage,
    createAssetsValidator,
    resizeImage("mainCategoryAssets"),
    createMainCategoryAssets
  )
  .get(permission,getMainCategoriesAssets);
Routes.route("/:id")
  .get(permission,UtilsValidator, getMainCategoryAsset)
  .delete(permission,UtilsValidator, deleteMainCategoryAssets)
  .put(permission,
    uploadImage,
    UtilsValidator,
    resizeImage("mainCategoryAssets"),
    updateMainCategoryAssets
  );
module.exports = Routes;
