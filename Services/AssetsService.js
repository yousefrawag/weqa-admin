const expressAsyncHandler = require("express-async-handler");
const createMainCategoryModel = require("../Models/createMainCategoryAssets");
const factory = require("./FactoryHandler");
const createAssetsnModel = require("../Models/createAssets");

exports.createAssets = expressAsyncHandler(async (req, res, next) => {
  const { name, category, subCategory } = req.body;

  // إنشاء نموذج الأصول
  const assetsModel = new createAssetsnModel({
    name: name,
    category,
    subCategory: subCategory,
  });

  // البحث عن الفئة الرئيسية بناءً على الـ category
  const mainCategoryAssets = await createMainCategoryModel.findById(category);

  if (!mainCategoryAssets) {
    return res.status(404).json({ msg: "mainCategoryAssets not found" });
  }

  // إضافة الـ asset إلى الفئة الرئيسية
  mainCategoryAssets.assets.push(assetsModel._id);
  await mainCategoryAssets.save();

  // حفظ الـ asset
  await assetsModel.save();

  // إرجاع الاستجابة بنجاح
  res.status(201).json({ status: "Success", data: assetsModel });
});

exports.getAssetss = expressAsyncHandler(async (req, res, next) => {
  const mainCategoriesAssets = await createAssetsnModel.find().populate({
    path: "category",
    select: "name ",
  });
  return res.json({ status: "Success", data: mainCategoriesAssets });
});
exports.getAssets = expressAsyncHandler(async (req, res, next) => {
  const mainCategoriesAssets = await createAssetsnModel
    .findById(req.params.id)
    .populate({
      path: "category",
      select: "name ",
    });
  return res.json({ status: "Success", data: mainCategoriesAssets });
});
exports.updateAssets = factory.updateOne(createAssetsnModel);
exports.deleteAssets = factory.deleteOne(createAssetsnModel);
