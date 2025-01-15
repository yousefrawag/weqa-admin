const expressAsyncHandler = require("express-async-handler");

const factory = require("./FactoryHandler");
const createCategoryAssetsModel = require("../Models/createCategoryAssets");
const createMainCategoryAssetsModel = require("../Models/createMainCategoryAssets");

exports.createCategoryAssets = expressAsyncHandler(async (req, res) => {
  const { name, image, mainCategoryAssets } = req.body;

  try {
    const subCategory = new createCategoryAssetsModel({
      name,
      image,
    });
    await createMainCategoryAssetsModel.findByIdAndUpdate(
      mainCategoryAssets,
      {
        $push: { categoryAssets: subCategory._id },
      },
      { new: true }
    );

    await subCategory.save();

    res.status(201).json({ status: "Success", data: subCategory });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Internal Server Error" });
  }
});

exports.getCategoriesAssets = factory.getAll(createCategoryAssetsModel)
exports.getCategoryAsset = factory.getOne(createCategoryAssetsModel)
exports.updateCategoryAssets = factory.updateOne(createCategoryAssetsModel);
exports.deleteCategoryAssets = factory.deleteOne(createCategoryAssetsModel);


