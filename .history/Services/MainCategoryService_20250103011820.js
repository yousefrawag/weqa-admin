const expressAsyncHandler = require("express-async-handler");
const createMainCategoryModel = require("../Models/createMainCategory");
const factory = require("./FactoryHandler");
const createSubCategoryModel = require("../Models/createSubCategory");
const createCategoryModel = require("../Models/createCategory");
exports.createMainCategory = expressAsyncHandler(async (req, res, next) => {
  const { name } = req.body;
  const subCategory = new createMainCategoryModel({
    name,
  });

  await subCategory.save();
  res.status(201).json({ status: "Success", data: subCategory });
});
exports.getMainCategories = expressAsyncHandler(async (req, res) => {
  const mainCategories = await createMainCategoryModel
    .find()
    .lean()
    .populate({
      path: "categories",
      select: "name", // تضمين فقط الحقل name
    })
    .populate({
      path: "subcategories",
      select: "name", // تضمين فقط الحقل name
    });

  const categories = await createCategoryModel
    .find()
    .lean()
    .populate({
      path: "categories",
      select: "name", // تضمين فقط الحقل name
    })
    .populate({
      path: "subcategories",
      select: "name", // تضمين فقط الحقل name
    });

  const subCategories = await createSubCategoryModel.find().lean().populate({
    path: "subcategories",
    select: "name", // تضمين فقط الحقل name
  });
  const subCategories = await createSubCategoryModel.find().lean().populate({
    path: "subcategories",
    select: "name", // تضمين فقط الحقل name
  });

  // حذف الحقول غير المرغوبة يدويًا
  mainCategories.forEach((category) => {
    delete category.categories;
  });

  categories.forEach((category) => {
    delete category.maincategories;
    delete category.subcategories;
  });

  subCategories.forEach((category) => {
    delete category.subcategories;
    delete category.categories;
    delete category.nestSubCategory;
  });

  // إرسال الاستجابة
  res.status(200).json({
    mainCategoriesResults: mainCategories.length,
    categoriesResults: categories.length,
    subCategoriesResults: subCategories.length,
    mainCategories: mainCategories,
    categories: categories,
    subCategories: subCategories,
  });
});

exports.getMainCategory = factory.getOne(createMainCategoryModel);
exports.updateMainCategory = factory.updateOne(createMainCategoryModel);
exports.deleteMainCategory = factory.deleteOne(createMainCategoryModel);
