const expressAsyncHandler = require("express-async-handler");
const createCategoryModel = require("../Models/createCategory");
const factory = require("./FactoryHandler");

exports.createCategory = expressAsyncHandler(async (req, res, next) => {
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
  parentCategory.parentCategory.push(subCategory._id);

  await subCategory.save()
  await parentCategory.save()
  res.status(201).json({ status: "Success", data: subCategory });
  const { name } = req.body;
  const subCategory = new createCategoryModel({
    name,
    levels: [],
  });

  await subCategory.save();
  res.status(201).json({ status: "Success", data: subCategory });
});
exports.getCategories = factory.getAll(createCategoryModel);
exports.getCategory = (model) => factory.getOne(model);
exports.updateCategory = factory.updateOne(createCategoryModel);
exports.deleteCategory = factory.deleteOne(createCategoryModel);
