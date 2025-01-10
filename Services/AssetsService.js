const expressAsyncHandler = require("express-async-handler");
const createMainCategoryModel = require("../Models/createMainCategoryAssets");
const factory = require("./FactoryHandler");
const createAssetsnModel = require("../Models/createAssets");

exports.createAssets = expressAsyncHandler(async (req, res, next) => {
  const { name, category, subCategory } = req.body;

  // إنشاء نموذج الأصول
  const assets = new createAssetsnModel({
    name: name,
    category: category,
    subCategory: subCategory,
  });

  // البحث عن الفئة الرئيسية بناءً على الـ category
  const mainCategoryAssets = await createMainCategoryModel.findById(category);

  if (!mainCategoryAssets) {
    return res.status(404).json({ msg: "mainCategoryAssets not found" });
  }

  // إضافة الـ asset إلى الفئة الرئيسية
  mainCategoryAssets.category.push(assets._id);
  await mainCategoryAssets.save();

  // حفظ الـ asset
  await assets.save();

  // إرجاع الاستجابة بنجاح
  res.status(201).json({ status: "Success", data: assets });
});



exports.getAssetss = factory.getAll(createAssetsnModel);
exports.getAssets = factory.getOne(createAssetsnModel);
exports.updateAssets = factory.updateOne(createAssetsnModel);
exports.deleteAssets = factory.deleteOne(createAssetsnModel);
