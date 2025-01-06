const expressAsyncHandler = require("express-async-handler");

const factory = require("./FactoryHandler");
const createLocationModel = require("../Models/createLocation");
const createBuildingModel = require("../Models/createBuilding");

exports.createLocation = expressAsyncHandler(async (req, res, next) => {

  const createLocation = new createLocationModel(
    req.body
  );
  
  const parentBuilding = await createBuildingModel.findById(req.);
  
  if (!parentBuilding) {
    return res.status(404).json({ msg: "Not Found Building" });
  }

  parentBuilding.location.push(createLocation._id);

  try {
    await createLocation.save();
    await parentBuilding.save();

    res.status(201).json({ status: "Success", data: createLocation });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Internal Server Error" });
  }
});

exports.getLocations = factory.getAll(createLocationModel);
exports.getLocation = factory.getOne(createLocationModel);
exports.updateLocation = factory.updateOne(createLocationModel);
exports.deleteLocation = factory.deleteOne(createLocationModel);
