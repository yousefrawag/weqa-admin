const expressAsyncHandler = require("express-async-handler");
const createCategoryModel = require("../Models/createCategory");
const factory = require("./FactoryHandler");
const createMainCategoryModel = require("../Models/createMainCategory");

exports.createCategory = expressAsyncHandler(async (req, res, next) => {
  const { maincategories, name } = req.body;

  const subCategory = new createCategoryModel({
    name,
    maincategories,
    subcategories: [],
  });
  const parentCategory = await createMainCategoryModel.findById(maincategories);
  if (!parentCategory) {
    return res.status(404).json({ msg: "Not Found MainCategory" });
  }

  parentCategory.categories.push(subCategory._id);

  try {
    await subCategory.save();
    await parentCategory.save();

    res.status(201).json({ status: "Success", data: subCategory });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Internal Server Error" });
  }
});

exports.getCategories = factory.getAll(createCategoryModel);
exports.getCategory = factory.getOne(createCategoryModel);
exports.updateCategory = factory.updateOne(createCategoryModel);
exports.deleteCategory = factory.deleteOne(createCategoryModel);
