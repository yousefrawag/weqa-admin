const expressAsyncHandler = require("express-async-handler");

const factory = require("./FactoryHandler");

const createMainCategoryModel = require("../Models/createMainCategory");
const createCategoryModel = require("../Models/createCategory");
const createSubCategoryModel = require("../Models/createSubCategory");
const createNestSubCategoryModel = require("../Models/createNestSubCategory");
const createSubNestSubCategoryModel = require("../Models/createSubNestSubCategory");
const createLocationModel = require("../Models/createBuilding");
const createBuildingModel = require("../Models/createLocation");

exports.createLocation = expressAsyncHandler(async (req, res, next) => {
  const { maincategories, name } = req.body;

  const createLocation = new createLocationModel({
    name,
    maincategories,
    subcategories: [],
  });
  const parentBuilding = await createBuildingModel.findById(maincategories);
  if (!parentBuilding) {
    return res.status(404).json({ msg: "Not Found MainCategory" });
  }

  parentBuilding.location.push(subCategory._id);

  try {
    await createLocation.save();
    await parentBuilding.save();

    res.status(201).json({ status: "Success", data: subCategory });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Internal Server Error" });
  }
});

exports.getLocations = factory.getAll(createLocationModel);
exports.getLocation = factory.getOne(createLocationModel);
exports.updateLocation = factory.updateOne(createLocationModel);
exports.deleteLocation = factory.deleteOne(createLocationModel);
