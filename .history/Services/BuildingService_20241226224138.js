const createBuildingModel = require("../Models/createBuilding");
const factory = require("./FactoryHandler");


exports.createBuilding = factory.createOne(createBuildingModel);
exports.getBuildings = factory.getAll(createBuildingsModel);
exports.getBuilding = factory.getOne(createBuildingsModel);
exports.updateBuilding = factory.updateOne(createBuildingsModel);
exports.deleteBuilding = factory.deleteOne(createBuildingsModel);
