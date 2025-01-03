const expressAsyncHandler = require("express-async-handler");
const createSubCategoryModel = require("../Models/createSubCategory");
const factory = require("./FactoryHandler");
const createCategoryModel = require("../Models/createCategory");
const createNestSubCategoryModel = require("../Models/createNestSubCategory");
const createSubNestSubCategoryModel = require("../Models/createSubNestSubCategory");
exports.createSubCategory = expressAsyncHandler(async (req, res, next) => {
  const { categories, name } = req.body;
  const subCategory = new createSubCategoryModel({
    name: name,
    categories,
  });

  const parentLevels = await createCategoryModel.findById(categories);
  if (!parentCategory) {
    return res.status(404).json({ msg: "Not Found MainCategory" });
  }
  parentLevels.subcategories.push(subCategory._id);
  await subCategory.save();
  await parentLevels.save();
  res.status(201).json({ status: "Success", data: subCategory });
});
exports.getSubCategories = factory.getAll(createSubCategoryModel)
exports.getSubCategory = factory.getOne(createSubCategoryModel);
exports.updateSubCategory = factory.updateOne(createSubCategoryModel);
exports.deleteSubCategory = factory.deleteOne(createSubCategoryModel);
