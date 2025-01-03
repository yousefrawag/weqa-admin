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
  const subNectSubCategories = await createSubNestSubCategoryModel.find();

  delete subNectSubCategories.nestsubcategory;

  // إرسال الاستجابة
  res.status(200).json({
    subNectSubCategoriesResults: subNectSubCategories.length,
    subNectSubCategories,
  });
});
exports.getSubNestSubCategory = factory.getOne(createSubNestSubCategoryModel);
exports.updateSubNestSubCategory = factory.updateOne(
  createSubNestSubCategoryModel
);
exports.deleteSubNestSubCategory = factory.deleteOne(
  createSubNestSubCategoryModel
);
