const expressAsyncHandler = require("express-async-handler");
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
exports.getsubSubCategories = factory.getAll(createSubNestSubCategoryModel);
exports.getsubSubCategory = factory.getOne(createSubNestSubCategoryModel);
exports.updatesubSubCategory = factory.updateOne(createSubNestSubCategoryModel);
exports.deletesubSubCategory = factory.deleteOne(createSubNestSubCategoryModel);
