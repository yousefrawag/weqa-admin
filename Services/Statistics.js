const expressAsyncHandler = require("express-async-handler");
const createEmployeeModel = require("../Models/createEmployee");
const createBuildingModel = require("../Models/createBuilding");
const createLocationModel = require("../Models/createLocation");
const createPermissionModel = require("../Models/createPermission");
const createMainCategoryAssetsModel = require("../Models/createMainCategoryAssets");
const createAssetsnModel = require("../Models/createAssets");
const createTicketModel = require("../Models/createTicket");
const createMainCategoryModel = require("../Models/createMainCategory");

exports.getStatistics = expressAsyncHandler(async (req, res, next) => {
  const employee = await createEmployeeModel.countDocuments();
  const building = await createBuildingModel.countDocuments();
  const location = await createLocationModel.countDocuments();
  const permission = await createPermissionModel.countDocuments();
  const mainCategoryAssets =
    await createMainCategoryAssetsModel.countDocuments();
  const assets = await createAssetsnModel.countDocuments();
  const tickets = await createTicketModel.countDocuments();
  const mainCategory = await createMainCategoryModel.countDocuments();
  res.json({
    msg: "success",
    data: {
      mainCategory,
      employee,
      building,
      location,
      permission,
      mainCategoryAssets,
      assets,
      tickets,
    },
  });
});
