const expressAsyncHandler = require("express-async-handler");
const createSubCategoryModel = require("../Models/createSubCategory");
const factory = require("./FactoryHandler");
const createLevelsModel = require("../Models/createMainCategory");
const createCategoryModel = require("../Models/createCategory");

exports.createNestSubCategory = expressAsyncHandler(async (req, res, next) => {
  const { subcategories, name } = req.body;
  const subCategory = new createSubCategoryModel({
    name: name,
    subcategories,
  });

  const subcategory= await createSubCategoryModel.findById(subcategories);

  subcategory.nestSubCategory.push(subcategories._id);
  await subCategory.save();
  await subcategory.save();
  res.status(201).json({ status: "Success", data: subCategory });
});
exports.getSubCategories = factory.getAll(createSubCategoryModel);
exports.getSubCategory = factory.getOne(createSubCategoryModel);
exports.updateSubCategory = factory.updateOne(createSubCategoryModel);
exports.deleteSubCategory = factory.deleteOne(createSubCategoryModel);
