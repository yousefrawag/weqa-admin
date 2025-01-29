const expressAsyncHandler = require("express-async-handler");

const factory = require("./FactoryHandler");
const createCategoryAssetsModel = require("../Models/createCategoryAssets");
const createSubCategoryAssetsModel = require("../Models/createSubCategoryAssets");

exports.createSubCategoryAssets = expressAsyncHandler(async (req, res) => {
  const { name, image, categoryAssets,data } = req.body;

  try {
    const subCategory = new createSubCategoryAssetsModel({
      name,
      image,
      data
    });
    await createCategoryAssetsModel.findByIdAndUpdate(
      categoryAssets,
      {
        $push: { subCategoryAssets: subCategory._id },
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

exports.getSubCategoriesAssets = factory.getAll(createSubCategoryAssetsModel);
exports.getSubCategoryAsset = factory.getOne(createSubCategoryAssetsModel);
exports.updateSubCategoryAssets = factory.updateOne(
  createSubCategoryAssetsModel,
  "subCategoryAssets"
);
exports.deleteSubCategoryAssets = factory.deleteOne(
  createSubCategoryAssetsModel,
  "subCategoryAssets"
);
