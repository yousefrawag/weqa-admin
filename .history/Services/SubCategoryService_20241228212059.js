const expressAsyncHandler = require("express-async-handler");
const createSubCategoryModel = require("../Models/createSubCategory");
const factory = require("./FactoryHandler");
const createLevelsModel = require("../Models/createLevels");

exports.createSubCategory = expressAsyncHandler(async (req, res, next) => {
 const {levels}=req.body.levels
  const subCategory = new createSubCategoryModel({
    name: req.body.name,
    levels,
    children:[]
  });
  const parentLevels = await createLevelsModel.findById(levels);
log
  parentLevels.children.push(subCategory._id);
  await subCategory.save();
  await parentLevels.save();
  res.status(201).json({ status: "Success", data: subCategory });
});
exports.getSubCategories = factory.getAll(createSubCategoryModel);
exports.getSubCategory = (model) => factory.getOne(model);
exports.updateSubCategory = factory.updateOne(createSubCategoryModel);
exports.deleteSubCategory = factory.deleteOne(createSubCategoryModel);
