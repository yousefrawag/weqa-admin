const expressAsyncHandler = require("express-async-handler");

const factory = require("./FactoryHandler");
const createMainCategoryAssetsModel = require("../Models/createMainCategoryAssets");

exports.createMainCategoryAssets = expressAsyncHandler(async (req, res) => {
  const { name, image, data } = req.body;

  const mainCategoryAssets = new createMainCategoryAssetsModel({
    name,
    image,
    data:JSON.parse(data),
  });

  await mainCategoryAssets.save();

  res.status(201).json({ status: "Success", data: mainCategoryAssets });
});

exports.getMainCategoriesAssets = factory.getAll(createMainCategoryAssetsModel);
exports.getMainCategoryAsset = factory.getOne(createMainCategoryAssetsModel);

exports.updateMainCategoryAssets = factory.updateOne(
  createMainCategoryAssetsModel,
  "mainCategoryAssets"
);
exports.deleteMainCategoryAssets = factory.deleteOne(
  createMainCategoryAssetsModel,
  "mainCategoryAssets"
);
