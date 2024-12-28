const expressAsyncHandler = require("express-async-handler");
const createMainCategoryModel = require("../Models/createMainCategory");
const factory = require("./FactoryHandler");
const createCategoryModel = require("../Models/createCategory");

exports.createMainCategory = expressAsyncHandler(async (req, res, next) => {
  const { category, name } = req.body;
  const subCategory = new createMainCategoryModel({
    name,
    category,
    children: [],
  });
  //  console.log(subCategory);

  const parentCategory = await createCategoryModel.findById(category);
  if (!parentCategory) {
    return res.status(404).json({ msg: "Not Found Category" });
  }
  parentCategory.mainCategory.push(subCategory._id);

  await subCategory.save()
  await parentCategory.save()
  res.status(201).json({ status: "Success", data: subCategory });
});
exports.getMainCategories = factory.getAll(createMainCategoryModel);
exports.getSubCategory = (model) => factory.getOne(model);
exports.updateMainCategory = factory.updateOne(createMainCategoryModel);
exports.deleteMainCategory = factory.deleteOne(createMainCategoryModel);
