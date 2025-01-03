const expressAsyncHandler = require("express-async-handler");
const createSubCategoryModel = require("../Models/createSubCategory");
const factory = require("./FactoryHandler");
const createCategoryModel = require("../Models/createCategory");

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
  const categories = await createCategoryModel
    .find()
    .lean()
    .populate({
      path: "categories",
      select: "name -nestSubCategory -categories",
    })

  categories.forEach((category) => {
    delete category.maincategories;
    delete category.subcategories;
  });
  subCategories.forEach((category) => {
    delete category.categories;
    delete category.nestSubCategory;
  });

  // إرسال الاستجابة
  res.status(200).json({
    results: subCategories.length,
    subCategories: subCategories,
  });
});
exports.getSubCategory = factory.getOne(createSubCategoryModel);
exports.updateSubCategory = factory.updateOne(createSubCategoryModel);
exports.deleteSubCategory = factory.deleteOne(createSubCategoryModel);
