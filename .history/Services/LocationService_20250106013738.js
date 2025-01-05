const expressAsyncHandler = require("express-async-handler");

const factory = require("./FactoryHandler");
const createLocationModel = require("../Models/createBuilding");
const createBuildingModel = require("../Models/createLocation");

exports.createLocation = expressAsyncHandler(async (req, res, next) => {
  const { maincategories, name } = req.body;

  const createLocation = new createLocationModel({
    name,
    kind,
    location.longitude,
    location.latitude,
    building,
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
