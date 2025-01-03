const expressAsyncHandler = require("express-async-handler");
const factory = require("./FactoryHandler");
const createSubNestSubCategoryModel = require("../Models/createSubNestSubCategory");
const createNestSubCategoryModel = require("../Models/createNestSubCategory");

exports.createSubNestSubCategory = expressAsyncHandler(
  async (req, res, next) => {
    const { nestsubcategory, name } = req.body;
    const SubNestSubCategory = new createSubNestSubCategoryModel({
      name: name,
      nestsubcategory,
    });
    const parentLevels = await createNestSubCategoryModel.findById(
      nestsubcategory
    );
    if (!parentLevels) {
      return res.status(404).json({ msg: "Not Found NestSubCategory" });
    }
    parentLevels.subnestsubcategories.push(SubNestSubCategory._id);
    await parentLevels.save();
    await SubNestSubCategory.save();
    res.status(201).json({ status: "Success", data: SubNestSubCategory });
  }
);
exports.getSubNestSubCategories = factory.getAll(createSubNestSubCategoryModel);
exports.getSubNestSubCategory = factory.getOne(createSubNestSubCategoryModel);
exports.updateSubNestSubCategory = factory.updateOne(
  createSubNestSubCategoryModel
);
exports.deleteSubNestSubCategory = factory.deleteOne(
  createSubNestSubCategoryModel
);
