const { Router } = require("express");

const { protect } = require("../Services/AuthService");
const { UtilsValidator } = require("../Resuble/UtilsValidationError");
const {
  createAssets,
  getAssetss,
  getAssets,
  deleteAssets,
  updateAssets,
} = require("../Services/AssetsService");

const Routes = Router();
Routes.use(protect);
Routes.route("/").post(createAssets).get(getAssetss);
Routes.route("/:id")
  .get(UtilsValidator, getAssets)
  .delete(UtilsValidator, deleteAssets)
  .put(UtilsValidator, updateAssets);

module.exports = Routes;
