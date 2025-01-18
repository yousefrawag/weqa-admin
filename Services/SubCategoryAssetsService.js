const expressAsyncHandler = require("express-async-handler");

const factory = require("./FactoryHandler");
const createCategoryAssetsModel = require("../Models/createCategoryAssets");
const createSubCategoryAssetsModel = require("../Models/createSubCategoryAssets");
const FeatureApi = require("../Utils/Feature");

exports.createSubCategoryAssets = expressAsyncHandler(async (req, res) => {
  const { name, image, categoryAssets } = req.body;

  try {
    const subCategory = new createSubCategoryAssetsModel({
      name,
      image,
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

exports.getSubCategoriesAssets = expressAsyncHandler(async (req, res) => {
  let fillter = {};
  if (req.filterObject) {
    fillter = req.filterObject;
  }

  const countDocs = await createSubCategoryAssetsModel.countDocuments();
  const ApiFeatures = new FeatureApi(
    createSubCategoryAssetsModel.find(fillter).populate("assets"),
    req.query
  )
    .Fillter(createSubCategoryAssetsModel)
    .Sort()
    .Fields()
    .Search()
    .Paginate(countDocs);
  const { MongooseQueryApi, PaginateResult } = ApiFeatures;
  const getDoc = await MongooseQueryApi;

  res
    .status(201)
    .json({ results: getDoc.length, PaginateResult, data: getDoc });
});
exports.getSubCategoryAsset = expressAsyncHandler(async (req, res, next) => {
  let query = createSubCategoryAssetsModel.findById(req.params.id).populate("assets");


  const getDocById = await query;
  if (!getDocById)
    next(
      new ApiError(`Sorry Can't get This ID From ID :${req.params.id}`, 404)
    );
  res.status(200).json({ data: getDocById });
})
exports.updateSubCategoryAssets = factory.updateOne(
  createSubCategoryAssetsModel,
  "subCategoryAssets"
);
exports.deleteSubCategoryAssets = factory.deleteOne(
  createSubCategoryAssetsModel,
  "subCategoryAssets"
);
