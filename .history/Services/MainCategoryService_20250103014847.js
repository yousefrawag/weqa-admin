const expressAsyncHandler = require("express-async-handler");
const createMainCategoryModel = require("../Models/createMainCategory");
const factory = require("./FactoryHandler");
const createSubCategoryModel = require("../Models/createSubCategory");
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
  .populate({
    path: "categories", // أولاً نملأ حقل categories
    populate: {
      path: "subcategories", // ثم نملأ subcategories داخل كل مستند في categories
      select: "name", // يمكنك تحديد الحقول المطلوبة فقط
    },
  });


  // إرسال الاستجابة
  res.status(200).json({
    results: mainCategories.length,
    data: mainCategories,
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
      select: "name",
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
