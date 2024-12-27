const createBuildingModel = require("../Models/createLevels");
const factory = require("./FactoryHandler");

exports.createBuilding = factory.createOne(createBuildingModel);
exports.getBuildings = factory.getAll(createBuildingModel);
exports.getBuilding =(model) => factory.getOne(model);
exports.updateBuilding = factory.updateOne(createBuildingModel);
exports.deleteBuilding = factory.deleteOne(createBuildingModel);
