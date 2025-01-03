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
exports.getsubNestSubCategories = factory.getAll(createSubNestSubCategoryModel);
exports.getsubNestSubCategory = factory.getOne(createSubNestSubCategoryModel);
exports.updatesubNestSubCategory = factory.updateOne(createSubNestSubCategoryModel);
exports.deletesubNestSubCategory = factory.deleteOne(createSubNestSubCategoryModel);
