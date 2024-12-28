const createSubCategoryModel = require("../Models/createSubCategory");
const factory = require("./FactoryHandler");

exports.createSubCategory = factory.createOne(createSubCategoryModel);
exports.getSubCategories = factory.getAll(createSubCategoryModel);
exports.getSubCategory = (model) => factory.getOne(model);
exports.updateSubCategory = factory.updateOne(createSubCategoryModel);
exports.deleteSubCategory = factory.deleteOne(createSubCategoryModel);
