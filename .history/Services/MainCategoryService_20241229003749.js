const expressAsyncHandler = require("express-async-handler");
const createMainCategoryModel = require("../Models/createMainCategory");
const factory = require("./FactoryHandler");
exports.createMainCategory = expressAsyncHandler(async (req, res, next) => {
  const { name } = req.body;
  const subCategory = new createMainCategoryModel({
    name,
  });

  await subCategory.save();
  res.status(201).json({ status: "Success", data: subCategory });
});

exports.getMainCategories = expressAsyncHandler(async (req, res) => {
  const categories = await createMainCategoryModel
    .find() // ابحث عن جميع السجلات
    .lean() // استخدام lean لتحسين الأداء
    .populate({
      path: "categories",
      select: "name", // إرجاع فقط الحقل name من maincategories
    })
    .populate({
      path: "subcategories",
      select: "name -categories", // استبعاد حقل categories داخل subcategories
    });

  // إزالة حقل categories من subcategories بعد الاستعلام
  categories.forEach((category) => {
    category.categories.forEach((subcategory) => {
      delete subcategory.categories; /
    });
  });

  // إرسال الاستجابة
  res.status(200).json({
    results: categories.length,
    data: categories,
  });
});
exports.getMainCategory = expressAsyncHandler(async (req, res) => {
  const category = await createMainCategoryModel
    .findOne({ _id: req.params.id }) 
    .lean() 
    .populate({
      path: "categories",
      select: "name",
    })
    .populate({
      path: "subcategories",
      select: "name -categories",
    });

  if (category && category.categories) {
    category.categories.forEach((subcategory) => {
      delete subcategory.categories; 
    });
  }

  // إرسال الاستجابة
  res.status(200).json({
    result: category ? 1 : 0, 
    data: category,
  });
});
exports.updateMainCategory = factory.updateOne(createMainCategoryModel);
exports.deleteMainCategory = factory.deleteOne(createMainCategoryModel);
