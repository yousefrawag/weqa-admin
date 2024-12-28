const createCategoryModel = require("../Models/createCategory");
const factory = require("./FactoryHandler");

exports.createCategory = factory.createOne(createCategoryModel);
exports.getCategory = factory.getAll(createCategoryModel);
exports.getLevel = (model) => factory.getOne(model);
exports.updateCategory = factory.updateOne(createCategoryModel);
exports.deleteCategory = factory.deleteOne(createCategoryModel);
