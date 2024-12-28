
const createLevelsModel = require("../Models/createLevels");
const factory = require("./FactoryHandler");

exports.createLevels = express

factory.createOne(createLevelsModel);
exports.getLevels = factory.getAll(createLevelsModel);
exports.getLevel =(model) => factory.getOne(model);
exports.updateLevels = factory.updateOne(createLevelsModel);
exports.deleteLevels = factory.deleteOne(createLevelsModel);
