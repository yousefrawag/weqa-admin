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
      path: "maincategories",
      select: "name", // إرجاع فقط الحقل name من maincategories
    })
    .populate({
      path: "subcategories",
      select: "name -categories", // استبعاد حقل categories داخل subcategories
    });

  // إزالة حقل categories من subcategories بعد الاستعلام
  categories.forEach((category) => {
    category.subcategories.forEach((subcategory) => {
      delete subcategory.categories; // حذف حقل categories بعد الاستعلام
    });
  });

  // إرسال الاستجابة
  res.status(200).json({
    results: categories.length,
    data: categories,
  });
});
exports.getMainCategory = factory.getOne(createMainCategoryModel, [
  { path: "categories", populate: { path: "subcategories" } },
]);;
exports.updateMainCategory = factory.updateOne(createMainCategoryModel);
exports.deleteMainCategory = factory.deleteOne(createMainCategoryModel);
