const expressAsyncHandler = require("express-async-handler");
const createCategoryModel = require("../Models/createCategory");
const factory = require("./FactoryHandler");
const createMainCategoryModel = require("../Models/createMainCategory");
const createSubCategoryModel = require("../Models/createSubCategory");
const createNestSubCategoryModel = require("../Models/createNestSubCategory");
const createSubNestSubCategoryModel = require("../Models/createSubNestSubCategory");
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

exports.getCategories = factory

exports.getCategory = expressAsyncHandler(async (req, res) => {
  const category = await createCategoryModel
    .findOne({ _id: req.params.id })
    .lean()
    .populate({
      path: "maincategories",
      select: "name",
    })
    .populate({
      path: "subcategories",
      select: "name -categories",
    });

  if (category && category.subcategories) {
    category.subcategories.forEach((subcategory) => {
      delete subcategory.categories;
    });
  }

  res.status(200).json({
    result: category ? 1 : 0,
    data: category,
  });
});

exports.updateCategory = factory.updateOne(createCategoryModel);
exports.deleteCategory = factory.deleteOne(createCategoryModel);
