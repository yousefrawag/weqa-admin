const expressAsyncHandler = require("express-async-handler");

const factory = require("./FactoryHandler");
const createSubCategoryAssetsModel = require("../Models/createSubCategoryAssets");
const createnestSubCategoryAssetsModel = require("../Models/createnestSubCategoryAssets");

exports.createNestSubCategoryAssets = expressAsyncHandler(async (req, res) => {
  const { name, image, subCategoryAssets, data } = req.body;

  try {
    const nestSubCategory = new createnestSubCategoryAssetsModel({
      name,
      image,
      data,
    });
    await createSubCategoryAssetsModel.findByIdAndUpdate(
      { _id: subCategoryAssets },
      {
        $push: { nestSubCategoryAssets: nestSubCategory._id },
      },
      { new: true }
    );

    await nestSubCategory.save();

    res.status(201).json({ status: "Success", data: nestSubCategory });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Internal Server Error" });
  }
});

exports.getnestSubCategoriesAssets = factory.getAll(
  createnestSubCategoryAssetsModel
);
exports.getnestSubCategoryAsset = factory.getOne(createnestSubCategoryAssetsModel);
exports.updatenestSubCategoryAssets = factory.updateOne(
  createnestSubCategoryAssetsModel,
  "nestSubCategoryAssets"
);
exports.deletenestSubCategoryAssets = factory.deleteOne(
  createnestSubCategoryAssetsModel,
  "nestSubCategoryAssets"
);
