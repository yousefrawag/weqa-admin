const expressAsyncHandler = require("express-async-handler");
const createCategoryModel = require("../Models/createCategory");
const factory = require("./FactoryHandler");
const createMainCategoryModel = require("../Models/createMainCategory");

exports.createCategory = expressAsyncHandler(async (req, res, next) => {
  const { maincategories, name } = req.body;

 

  const subCategory = new createCategoryModel({
    name,
    maincategories,
    subcategories: []
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

exports.getCategories = factory.getAll(createCategoryModel)
exports.getCategory = (model) => factory.getOne(model);
exports.updateCategory = factory.updateOne(createCategoryModel);
exports.deleteCategory = factory.deleteOne(createCategoryModel);
