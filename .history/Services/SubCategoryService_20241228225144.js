const expressAsyncHandler = require("express-async-handler");
const createSubCategoryModel = require("../Models/createSubCategory");
const factory = require("./FactoryHandler");
const createLevelsModel = require("../Models/createMainCategory");

exports.createSubCategory = expressAsyncHandler(async (req, res, next) => {
  const { categories, name } = req.body;
  const subCategory = new createSubCategoryModel({
    name: name,
    categories,
    subcategories: [],
  });

  const parentLevels = await createLevelsModel.findById(categories);

  parentLevels.subcategories.push(subCategory._id);
  await subCategory.save();
  await parentLevels.save();
  res.status(201).json({ status: "Success", data: subCategory });
});
exports.getSubCategories = factory.getAll(createSubCategoryModel);
exports.getSubCategory = (model) => factory.getOne(model);
exports.updateSubCategory = factory.updateOne(createSubCategoryModel);
exports.deleteSubCategory = factory.deleteOne(createSubCategoryModel);
