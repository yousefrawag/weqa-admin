const expressAsyncHandler = require("express-async-handler");
const createMainCategoryModel = require("../Models/createMainCategory");
const factory = require("./FactoryHandler");
exports.createMainCategory = expressAsyncHandler(async (req, res, next) => {
  const { name } = req.body;
  const subCategory = new createMainCategoryModel({
    name,
  });

  await subCategory.save();
  res.status(201).json({ status: "Success", data: subCategory });
});


exports.getMainCategories = factory.getAll(createMainCategoryModel, "", [
  { path: "categories", populate: { path: "subcategories" } },
]);
exports.getMainCategory = factory.getOne(createMainCategoryModel, [
  { path: "categories", populate: { path: "subcategories" } },
]);;
exports.updateMainCategory = factory.updateOne(createMainCategoryModel);
exports.deleteMainCategory = factory.deleteOne(createMainCategoryModel);
