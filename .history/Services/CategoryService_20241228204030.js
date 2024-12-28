const createCategoryModel = require("../Models/createCategory");
const factory = require("./FactoryHandler");

exports.createCategory = factory.createOne(createCategoryModel);
exports.getCategories = factory.getAll(createCategoryModel);
exports.getCategory = (model) => factory.getOne(model);
exports.updateCategory = factory.updateOne(createCategoryModel);
exports.deleteCategory = factory.deleteOne(createCategoryModel);
