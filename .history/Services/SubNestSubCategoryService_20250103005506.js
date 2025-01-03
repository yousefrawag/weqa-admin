const expressAsyncHandler = require("express-async-handler");
const createSubCategoryModel = require("../Models/createSubCategory");
const factory = require("./FactoryHandler");
const createSubNestSubCategoryModel = require("../Models/createSubNestSubCategory");
const createNestSubCategoryModel = require("../Models/createNestSubCategory");

exports.createSubNestSubCategory = expressAsyncHandler(async (req, res, next) => {
  const { nestsubcategory, name } = req.body;
  const SubNestSubCategory = new createSubNestSubCategoryModel({
    name: name,
    nestsubcategory,
  });


  await SubNestSubCategory.save();
  res.status(201).json({ status: "Success", SubNestSubCategory });
});
exports.getSubCategories = factory.getAll(createSubCategoryModel);
exports.getSubCategory = factory.getOne(createSubCategoryModel);
exports.updateSubCategory = factory.updateOne(createSubCategoryModel);
exports.deleteSubCategory = factory.deleteOne(createSubCategoryModel);
