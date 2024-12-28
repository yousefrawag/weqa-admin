const expressAsyncHandler = require("express-async-handler");
const createLevelsModel = require("../Models/createMainCategory");
const factory = require("./FactoryHandler");
const createCategoryModel = require("../Models/createCategory");

exports.createLevels = expressAsyncHandler(async (req, res, next) => {
  const { category, name } = req.body;
  const subCategory = new createLevelsModel({
    name,
    category,
    children: [],
  });
  //  console.log(subCategory);

  const parentCategory = await createCategoryModel.findById(category);
  if (!parentCategory) {
    return res.status(404).json({ msg: "Not Found Category" });
  }
  parentCategory.levels.push(subCategory._id);

  (await subCategory.save()).populate("category");
  (await parentCategory.save()).populate("levels");
  res.status(201).json({ status: "Success", data: subCategory });
});
exports.getLevels = factory.getAll(createLevelsModel);
exports.getLevel = (model) => factory.getOne(model);
exports.updateLevels = factory.updateOne(createLevelsModel);
exports.deleteLevels = factory.deleteOne(createLevelsModel);
