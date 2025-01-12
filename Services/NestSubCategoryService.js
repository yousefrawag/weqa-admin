const expressAsyncHandler = require("express-async-handler");
const createSubCategoryModel = require("../Models/createSubCategory");
const factory = require("./FactoryHandler");
const createNestSubCategoryModel = require("../Models/createNestSubCategory");

exports.createNestSubCategory = expressAsyncHandler(async (req, res, next) => {
  const { subcategories, name } = req.body;
  const nestSubCategory = new createNestSubCategoryModel({
    name: name,
    subcategories,
  });

  const subCategory = await createSubCategoryModel.findById(subcategories);
  if (!subCategory) {
    return res.status(404).json({ msg: "Not Found subCategory" });
  }
  subCategory.nestSubCategory.push(nestSubCategory._id);
  await nestSubCategory.save();
  await subCategory.save();
  res.status(201).json({ status: "Success", data: nestSubCategory });
});
exports.getNestSubCategories = factory.getAll(createNestSubCategoryModel);
exports.getNestSubCategory = factory.getOne(createNestSubCategoryModel);
exports.updateNestSubCategory = factory.updateOne(createNestSubCategoryModel);
exports.deleteNestSubCategory = factory.deleteOne(createNestSubCategoryModel);
