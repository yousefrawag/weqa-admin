const expressAsyncHandler = require("express-async-handler");
const factory = require("./FactoryHandler");
const createSubNestSubCategoryModel = require("../Models/createSubNestSubCategory");
const createNestSubCategoryModel = require("../Models/createNestSubCategory");

exports.createSubNestSubCategory = expressAsyncHandler(
  async (req, res, next) => {
    const { nestsubcategory, name } = req.body;
    const SubNestSubCategory = new createSubNestSubCategoryModel({
      name: name,
      nestsubcategory,
    });
    const parentLevels = await createNestSubCategoryModel.findById(nestsubcategory);

    parentLevels.subnestsubcategories.push(subCategory._id);
    await parentLevels.save();
    await SubNestSubCategory.save();
    res.status(201).json({ status: "Success", data: SubNestSubCategory });
  }
);
exports.getSubNestSubCategories = expressAsyncHandler(async (req, res) => {
  const subNectSubCategories = await createSubNestSubCategoryModel
    .find()
    .lean();

  subNectSubCategories.forEach((category) => {
    delete category.nestsubcategory;
  });

  // إرسال الاستجابة
  res.status(200).json({
    nestSububCategoriesResults: subNectSubCategories.length,
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
