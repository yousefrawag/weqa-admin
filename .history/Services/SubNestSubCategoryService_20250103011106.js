const expressAsyncHandler = require("express-async-handler");
const factory = require("./FactoryHandler");
const createSubNestSubCategoryModel = require("../Models/createSubNestSubCategory");

exports.createSubNestSubCategory = expressAsyncHandler(
  async (req, res, next) => {
    const { nestsubcategory, name } = req.body;
    const SubNestSubCategory = new createSubNestSubCategoryModel({
      name: name,
      nestsubcategory,
    });
    SubNestSubCategory.forEach((category) => {
      delete category.nestsubcategory;
    });
    await SubNestSubCategory.save();
    res.status(201).json({ status: "Success", data: SubNestSubCategory });
  }
);
exports.getSubNestSubCategories = expressAsyncHandler(async (req, res) => {
  const subCategories = await createSubNestSubCategoryModel.find().lean().populate({
    path: "nestsubcategory",
    select: "name -categories -subcategories",
  });
  const nestSubCategory = await createNestSubCategoryModel
    .find()
    .lean()
    .populate({
      path: "nestsubcategories",
      select: "name -subnestsubcategories -subcategories",
    });

  nestSubCategory.forEach((category) => {
    delete category.subnestsubcategories;
    delete category.subcategories;
  });
  subCategories.forEach((category) => {
    delete category.categories;
    delete category.nestSubCategory;
  });

  // إرسال الاستجابة
  res.status(200).json({
    subCategoriesResults: subCategories.length,
    nestSubCategoryResults: nestSubCategory.length,
    subCategories,
    nestSubCategory,
  });
});
exports.getSubNestSubCategory = factory.getOne(createSubNestSubCategoryModel);
exports.updateSubNestSubCategory = factory.updateOne(createSubNestSubCategoryModel);
exports.deleteSubNestSubCategory = factory.deleteOne(createSubNestSubCategoryModel);
