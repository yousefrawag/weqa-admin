const expressAsyncHandler = require("express-async-handler");
const createSubCategoryModel = require("../Models/createSubCategory");
const factory = require("./FactoryHandler");
const createLevelsModel = require("../Models/createLevels");

exports.createSubCategory = expressAsyncHandler(async (req, res, next) => {
  const subCategory = new Category({
    name: "فرع شمال سيناء",
    levels: parentId,
  });
  const parentCategory = await createLevelsModel.findById(req.body.le);

  parentCategory.children.push(subCategory._id);
  await subCategory.save();
  await parentCategory.save();

  console.log("Subcategory added:", subCategory);
});
exports.getSubCategories = factory.getAll(createSubCategoryModel);
exports.getSubCategory = (model) => factory.getOne(model);
exports.updateSubCategory = factory.updateOne(createSubCategoryModel);
exports.deleteSubCategory = factory.deleteOne(createSubCategoryModel);
