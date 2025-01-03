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

  subCategory.nestSubCategory.push(nestSubCategory._id);
  await nestSubCategory.save();
  await subCategory.save();
  res.status(201).json({ status: "Success", data: nestSubCategory });
});
exports.getNestSubCategories = factory.getAll(createSubCategoryModel);
exports.getNestSubCategory = factory.getOne(createSubCategoryModel);
exports.updateNestSubCategory = factory.updateOne(createSubCategoryModel);
exports.deleteNestSubCategory = factory.deleteOne(createSubCategoryModel);
