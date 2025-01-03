const expressAsyncHandler = require("express-async-handler");
const createSubCategoryModel = require("../Models/createSubCategory");
const factory = require("./FactoryHandler");
const createLevelsModel = require("../Models/createMainCategory");
const createCategoryModel = require("../Models/createCategory");
const createNestSubCategoryModel = require("../Models/createNestSubCategory");
const createSubNestSubCategoryModel = require("../Models/createSubNestSubCategory");

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
  res.status(201).json({ status: "Success", data: subCategory });
});
exports.getNestSubCategories = expressAsyncHandler(async (req, res) => {
  const nestSubCategories = await createNestSubCategoryModel
    .find()
    .lean()
    .populate({
      path: "subnestsubcategories",
      select: "name  -nestsubcategory",
    });
  const subNestSubCategory = await createSubNestSubCategoryModel
    .find()
    .lean()
    .populate({
      path: "nestsubcategories",
      select: "name -subnestsubcategories -subcategories",
    });

  nestSubCategories.forEach((category) => {
    delete category.subcategories;
    delete category.subnestsubcategories;
  });

  // إرسال الاستجابة
  res.status(200).json({
    nestSubCategoriesResults: nestSubCategories.length,
    subNestSubCategoryResults: subNestSubCategory.length,

    nestSubCategories,
    subNestSubCategory,
  });
});
exports.getSubCategory = factory.getOne(createSubCategoryModel);
exports.updateSubCategory = factory.updateOne(createSubCategoryModel);
exports.deleteSubCategory = factory.deleteOne(createSubCategoryModel);
