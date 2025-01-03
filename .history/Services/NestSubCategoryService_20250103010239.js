const expressAsyncHandler = require("express-async-handler");
const createSubCategoryModel = require("../Models/createSubCategory");
const factory = require("./FactoryHandler");
const createLevelsModel = require("../Models/createMainCategory");
const createCategoryModel = require("../Models/createCategory");
const createNestSubCategoryModel = require("../Models/createNestSubCategory");

exports.createNestSubCategory = expressAsyncHandler(async (req, res, next) => {
  const { subcategories, name } = req.body;
  const nestSubCategory = new createNestSubCategoryModel({
    name: name,
    subcategories,
  });

  const subCategory= await createSubCategoryModel.findById(subcategories);

  subCategory.nestSubCategory.push(nestSubCategory._id);
  await nestSubCategory.save();
  await subCategory.save();
  res.status(201).json({ status: "Success", data: subCategory });
});
exports.getNestSubCategories =expressAsyncHandler(async (req, res) => {
  const nestSubCategories = await createNestSubCategoryModel.find().lean().populate({
    path: "subnestsubcategories",
    select: "name  -nestsubcategory",
  });
  const nestSubCategory = await createNestSubCategoryModel
    .find()
    .lean()
    .populate({
      path: "nestsubcategories",
      select: "name -subnestsubcategories -subcategories",
    });

    nestSubCategories.forEach((category) => {
   console.log(category);
   
  });
  

  // إرسال الاستجابة
  res.status(200).json({
   
    nestSubCategoryResults: nestSubCategory.length,
    
    nestSubCategory,
  });
});
exports.getSubCategory = factory.getOne(createSubCategoryModel);
exports.updateSubCategory = factory.updateOne(createSubCategoryModel);
exports.deleteSubCategory = factory.deleteOne(createSubCategoryModel);
