
const factory = require("./FactoryHandler");

exports.createCategory = factory.createOne(createCat);
exports.getCategory = factory.getAll(createCategoryModel);
exports.getLevel =(model) => factory.getOne(model);
exports.updateCategory = factory.updateOne(createCategoryModel);
exports.deleteCategory = factory.deleteOne(createCategoryModel);
