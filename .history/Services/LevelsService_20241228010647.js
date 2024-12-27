
const factory = require("./FactoryHandler");

exports.createLevels = factory.createOne(createLe);
exports.getLevels = factory.getAll(createLevelsModel);
exports.getLevels =(model) => factory.getOne(model);
exports.updateLevels = factory.updateOne(createLevelsModel);
exports.deleteLevels = factory.deleteOne(createLevelsModel);
