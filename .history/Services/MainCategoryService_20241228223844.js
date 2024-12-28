const expressAsyncHandler = require("express-async-handler");
const createMainCategoryModel = require("../Models/createMainCategory");
const factory = require("./FactoryHandler");
const createCategoryModel = require("../Models/createCategory");

exports.createMainCategory = expressAsyncHandler(async (req, res, next) => {
  const { name } = req.body;
  const subCategory = new createCategoryModel({
    name,
    levels: [],
  });

  await subCategory.save();
  res.status(201).json({ status: "Success", data: subCategory });
});
exports.getMainCategories = factory.getAll(createMainCategoryModel);
exports.getMainCategory = (model) => factory.getOne(model);
exports.updateMainCategory = factory.updateOne(createMainCategoryModel);
exports.deleteMainCategory = factory.deleteOne(createMainCategoryModel);
