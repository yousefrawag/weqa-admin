const factory = require("./FactoryHandler");

const createBuildingsModel = require("../Modules/createBuilding");

exports.createBuilding = factory.createOne(createBuildingsModel);
exports.getBuildings = factory.getAll(createBuildingsModel);
exports.getBuilding = factory.getOne(createBuildingsModel);
exports.updateBuilding = factory.updateOne(createBuildingsModel);
exports.deleteBuilding = factory.deleteOne(createBuildingsModel);
