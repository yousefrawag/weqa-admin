const expressAsyncHandler = require("express-async-handler");

const factory = require("./FactoryHandler");
const createLocationModel = require("../Models/l");
const createBuildingModel = require("../Models/createLocation");

exports.createLocation = expressAsyncHandler(async (req, res, next) => {
  const { name, kind, location, building } = req.body;

  const createLocation = new createLocationModel({
    name,
    kind,
    location: {
      longitude: location.longitude,
      latitude: location.latitude,
    },
    building,
  });
  
  const parentBuilding = await createBuildingModel.findById(building);
  console.log(parentBuilding);
  
  if (!parentBuilding) {
    return res.status(404).json({ msg: "Not Found Building" });
  }

  parentBuilding.location.push(parentBuilding._id);

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
