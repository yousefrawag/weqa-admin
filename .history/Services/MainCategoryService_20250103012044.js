const expressAsyncHandler = require("express-async-handler");
const createMainCategoryModel = require("../Models/createMainCategory");
const factory = require("./FactoryHandler");
const createSubCategoryModel = require("../Models/createSubCategory");
const createCategoryModel = require("../Models/createCategory");
const createNestSubCategoryModel = require("../Models/createNestSubCategory");
const createSubNestSubCategoryModel = require("../Models/createSubNestSubCategory");
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
  const nestSubCategories = await createNestSubCategoryModel
    .find()
    .lean()
    .populate({
      path: "subnestsubcategories",
      select: "name", // تضمين فقط الحقل name
    });
  const subNestSubCategories = await createSubNestSubCategoryModel
    .find()
    .lean()
   

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
    nestSubCategoriesResults: nestSubCategories.length,
    subNestSubCategoriesResults: subNestSubCategories.length,
    mainCategories,
    categories,
    subCategories,
    nestSubCategories,
    subNestSubCategories,
  });
});

exports.getMainCategory = factory.getOne(createMainCategoryModel);
exports.updateMainCategory = factory.updateOne(createMainCategoryModel);
exports.deleteMainCategory = factory.deleteOne(createMainCategoryModel);
