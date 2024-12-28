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
  const categories = await createCategoryModel
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

exports.getCategory = expressAsyncHandler(async (req, res) => {
  const category = await createCategoryModel
    .findOne({ _id: req.params.id }) 
    .lean() 
    .populate({
      path: "maincategories",
      select: "name", 
    })
    .populate({
      path: "subcategories",
      select: "name -categories", 
    });

  // إذا كانت subcategories موجودة، حذف حقل categories
  if (category && category.subcategories) {
    category.subcategories.forEach((subcategory) => {
      delete subcategory.categories; // حذف حقل categories
    });
  }

  // إرسال الاستجابة
  res.status(200).json({
    result: category ? 1 : 0, // إذا كانت النتيجة موجودة
    data: category,
  });
});

exports.updateCategory = factory.updateOne(createCategoryModel);
exports.deleteCategory = factory.deleteOne(createCategoryModel);
