const expressAsyncHandler = require("express-async-handler");
const createCategoryModel = require("../Models/createCategory");
const factory = require("./FactoryHandler");
const createMainCategoryModel = require("../Models/createMainCategory");

exports.createCategory = expressAsyncHandler(async (req, res, next) => {
  const { maincategories, name } = req.body;

  const subCategory = new createCategoryModel({
    name,
    maincategories,
    subcategories: [],
  });

  // البحث عن الـ maincategory باستخدام ObjectId
  const parentCategory = await createMainCategoryModel.findById(maincategories);
  if (!parentCategory) {
    return res.status(404).json({ msg: "Not Found MainCategory" });
  }

  // إضافة الـ subCategory إلى فئة الـ categories في الـ parentCategory
  parentCategory.categories.push(subCategory._id);

  try {
    await subCategory.save();
    await parentCategory.save();

    res.status(201).json({ status: "Success", data: subCategory });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Internal Server Error" });
  }
});

exports.getCategories = expressAsyncHandler(async (req, res) => {
  const categories = await createCategoryModel.find() // ابحث عن جميع السجلات
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

  // إرسال الاستجابة
  res.status(200).json({
    results: categories.length,
    data: categories,
  });
});


// exports.getCategories = factory.getAll(createCategoryModel, "", [
//   "maincategories",
//   "subcategories",
// ]);
exports.getCategory = factory.getOne(createCategoryModel, [
  "maincategories",
  "maincategories.categories",
  "subcategories",
]);

exports.updateCategory = factory.updateOne(createCategoryModel);
exports.deleteCategory = factory.deleteOne(createCategoryModel);
