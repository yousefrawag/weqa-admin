const createBuildingModel = require("../Models/createBuilding");
const factory = require("./FactoryHandler");

exports.createBuilding = factory.createOne(createBuildingModel);
exports.getBuildings = factory.getAll(createBuildingModel);
exports.getBuilding = factory.getOne(createBuildingModel);
exports.updateBuilding = factory.updateOne(createBuildingModel);
exports.deleteBuilding = factory.deleteOne(createBuildingModel);
