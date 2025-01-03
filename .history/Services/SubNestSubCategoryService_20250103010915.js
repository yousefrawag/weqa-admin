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
exports.getsunSubCategories = factory.getAll(createSubNestSubCategoryModel);
exports.getsunSubCategory = factory.getOne(createSubNestSubCategoryModel);
exports.updatesunSubCategory = factory.updateOne(createSubNestSubCategoryModel);
exports.deletesunSubCategory = factory.deleteOne(createSubNestSubCategoryModel);
