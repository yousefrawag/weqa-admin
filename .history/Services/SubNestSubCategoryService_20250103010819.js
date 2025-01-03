const expressAsyncHandler = require("express-async-handler");
const createSubCategoryModel = require("../Models/createSubCategory");
const factory = require("./FactoryHandler");
const createSubNestSubCategoryModel = require("../Models/createSubNestSubCategory");

exports.createSubNestSubCategory = expressAsyncHandler(
  async (req, res, next) => {
    const { nestsubcategory, name } = req.body;
    const SubNestSubCategory = new createSubNestSubCategoryModel({
      name: name,
      nestsubcategory,
    });
    SubNestSubCategory.forEach((category) => {
      delete category.nestsubcategory;
    });
    await SubNestSubCategory.save();
    res.status(201).json({ status: "Success", data: SubNestSubCategory });
  }
);
exports.getSubCategories = factory.getAll(createSubNestSubCategoryModel);
exports.getSubCategory = factory.getOne(createSubNestSubCategoryModel);
exports.updateSubCategory = factory.updateOne(createSubNestSubCategoryModel);
exports.deleteSubCategory = factory.deleteOne(createSubNestSubCategoryModel);
