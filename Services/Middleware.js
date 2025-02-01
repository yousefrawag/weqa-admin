const expressAsyncHandler = require("express-async-handler");
const createBuildingModel = require("../Models/createBuilding");
const createLocationModel = require("../Models/createLocation");
const createAssetsnModel = require("../Models/createAssets");
const createMainCategoryAssetsModel = require("../Models/createMainCategoryAssets");

exports.permissionBuilding = expressAsyncHandler(async (req, res, next) => {
  const url = req.originalUrl;
  const resource = url.split("/")[3];
  const method = req.method.toLowerCase();
  if (req.user.building === "all" || req.user.roles.owner === "owner") {
    return next();
  }
  if (
    resource === "building" &&
    req.user.permissions.building.actions.includes(method)
  ) {
    const building = await createBuildingModel.findById(req.user.building);

    if (!building) {
      return res.status(404).json({ msg: "ليس لديك صلاحية وصول" });
    }
  } else if (
    resource === "location" &&
    req.user.permissions.building.actions.includes(method)
  ) {
    const location = await createLocationModel.findOne({
      building: req.user.building,
    });
    if (!location) {
      return res.status(404).json({ msg: "ليس لديك صلاحية وصول" });
    }
  } else if (
    resource === "assets" &&
    req.user.permissions.building.actions.includes(method)
  ) {
    const assets = await createAssetsnModel.findOne({
      building: req.user.building,
    });
    if (!assets) {
      return res.status(404).json({ msg: "ليس لديك صلاحية وصول" });
    }
  }
  next();
});

exports.permissionCategory = expressAsyncHandler(async (req, res, next) => {
  const url = req.originalUrl;
  const resource = url.split("/")[3];
  const method = req.method.toLowerCase();
  if (req.user.building === "all" || req.user.roles.owner === "owner") {
    return next();
  }
  if (
    (resource === "mainCategoryAssets" &&
      !req.user.permissions.mainCategoryAssets.allowedIds.includes(
        req.params.id
      )) ||
    !req.user.permissions.mainCategoryAssets.actions.includes(method)
  ) {
    return res.status(404).json({ msg: "ليس لديك صلاحية وصول" });
  } else if (
    resource === "categoryAssets" &&
    req.user.permissions.mainCategoryAssets.actions.includes(method)
  ) {
    const categoryAssets = await createMainCategoryAssetsModel.find({
      categoryAssets: { $in: [req.params.id] },
    });
    if (!categoryAssets) {
      return res.status(404).json({ msg: "ليس لديك صلاحية وصول" });
    }
  } else if (
    resource === "subCategoryAssets" &&
    req.user.permissions.mainCategoryAssets.actions.includes(method)
  ) {
    const mainCategoryAssets = await createMainCategoryAssetsModel
      .findOne({
        _id: { $in: req.user.permissions.mainCategoryAssets.allowedIds },
      })
      .select("categoryAssets");
    const exists = mainCategoryAssets.categoryAssets.some((category) =>
      category.subCategoryAssets.some(
        (subCategory) => subCategory._id.toString() === req.params.id.toString()
      )
    );

    if (!exists) {
      return res.status(404).json({ msg: "ليس لديك صلاحية وصول" });
    }
  } else if (
    resource === "assets" &&
    req.user.permissions.mainCategoryAssets.actions.includes(method)
  ) {
    const assets = await createMainCategoryAssetsModel.find({
      assets: { $in: [req.params.id] },
    });
    if (!assets) {
      return res.status(404).json({ msg: "ليس لديك صلاحية وصول" });
    }
  }

  next();
});

exports.permissionEmployee = expressAsyncHandler((req, res, next) => {
  if (req.user.building === "all" || req.user.roles.owner === "owner") {
    return next();
  }
  const userBuilding = req.user.building;
  const requestBuilding = req.body.building;
  const method = req.method.toLowerCase();
  if (!userBuilding || !requestBuilding) {
    return res.status(400).json({ msg: "بيانات المبنى غير صحيحة" });
  }

  if (
    userBuilding.toString() !== requestBuilding.toString() ||
    !req.user.permissions.employee.actions.includes(method)
  ) {
    return res.status(403).json({ msg: "ليس لديك صلاحية وصول" });
  }
  next();
});
