const expressAsyncHandler = require("express-async-handler");

const factory = require("./FactoryHandler");
const createLocationModel = require("../Models/createLocation");
const createBuildingModel = require("../Models/createBuilding");

exports.createLocation = expressAsyncHandler(async (req, res, next) => {
  const { name, location, kind, floors, building } = req.body;

  const newLocation = new createLocationModel({
    name,
    location,
    kind,
    floors,
    building,
  });

  const parentBuilding = await createBuildingModel.findById(building);

  if (!parentBuilding) {
    return res.status(404).json({ msg: "Not Found Building" });
  }

  parentBuilding.location.push(newLocation._id);

  try {
 
    await newLocation.save();
    await parentBuilding.save();
console.log(newLocation);

    res.status(201).json({ status: "Success", data: newLocation });
  } catch (error) {
    console.error("Error saving location:", error);
    res.status(500).json({ msg: "Internal Server Error" });
  }
});


exports.getLocations = factory.getAll(createLocationModel);
exports.getLocation = factory.getOne(createLocationModel);
exports.updateLocation = factory.updateOne(createLocationModel);
exports.deleteLocation = factory.deleteOne(createLocationModel);
