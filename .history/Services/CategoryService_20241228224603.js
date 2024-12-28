const expressAsyncHandler = require("express-async-handler");
const createCategoryModel = require("../Models/createCategory");
const factory = require("./FactoryHandler");
const createMainCategoryModel = require("../Models/createMainCategory");

exports.createCategory = expressAsyncHandler(async (req, res, next) => {
  const { categories, name } = req.body;
  const subCategory = new createCategoryModel({
    name,
    categories,
    children: [],
  });
  //  console.log(subCategory);

  const parentCategory = await createMainCategoryModel.findById(categories);
  if (!parentCategory) {
    return res.status(404).json({ msg: "Not Found MainCategory" });
  }
  parentCategory.categories.push(subCategory._id);

  await subCategory.save()
  await parentCategory.save()
  res.status(201).json({ status: "Success", data: subCategory });

});
exports.getCategories = factory.getAll(createCategoryModel);
exports.getCategory = (model) => factory.getOne(model);
exports.updateCategory = factory.updateOne(createCategoryModel);
exports.deleteCategory = factory.deleteOne(createCategoryModel);
