const expressAsyncHandler = require("express-async-handler");
const createSubCategoryModel = require("../Models/createSubCategory");
const factory = require("./FactoryHandler");
const createCategoryModel = require("../Models/createCategory");
const createNestSubCategoryModel = require("../Models/createNestSubCategory");
const createSubNestSubCategoryModel = require("../Models/createSubNestSubCategory");
exports.createSubCategory = expressAsyncHandler(async (req, res, next) => {
  const { categories, name } = req.body;
  const subCategory = new createSubCategoryModel({
    name: name,
    categories,
  });

  const parentLevels = await createCategoryModel.findById(categories);

  parentLevels.subcategories.push(subCategory._id);
  await subCategory.save();
  await parentLevels.save();
  res.status(201).json({ status: "Success", data: subCategory });
});
exports.getSubCategories = expressAsyncHandler(async (req, res) => {
  const subCategories = await createSubCategoryModel.find().lean().populate({
    path: "subcategories",
    select: "name -categories -subcategories",
  });
  const nestSubCategory = await createNestSubCategoryModel
    .find()
    .lean()
    .populate({
      path: "nestsubcategories",
      select: "name -subnestsubcategories -subcategories",
    });
    const subNestSubCategories = await createSubNestSubCategoryModel
    .find()
    .lean();
    subCategories.forEach((category) => {
      delete category.categories;
      delete category.nestSubCategory;
    });
  nestSubCategory.forEach((category) => {
    delete category.subnestsubcategories;
    delete category.subcategories;
  });
  subNestSubCategories.forEach((category) => {
    delete category.nestsubcategory;
  });

  // إرسال الاستجابة
  res.status(200).json({
    subCategoriesResults: subCategories.length,
    nestSubCategoryResults: nestSubCategory.length,
    subCategories,
    nestSubCategory,
  });
});
exports.getSubCategory = factory.getOne(createSubCategoryModel);
exports.updateSubCategory = factory.updateOne(createSubCategoryModel);
exports.deleteSubCategory = factory.deleteOne(createSubCategoryModel);
