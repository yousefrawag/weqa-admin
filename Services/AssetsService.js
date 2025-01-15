const expressAsyncHandler = require("express-async-handler");
const factory = require("./FactoryHandler");
const createAssetsnModel = require("../Models/createAssets");

exports.createAssets = expressAsyncHandler(async (req, res) => {
  try {
    const assetsModel = new createAssetsnModel(req.body );
    await assetsModel.save();
    res.status(201).json({ status: "Success", data: assetsModel });
  } catch (error) {
    res.status(400).json({ status: "Error", message: error.message });
  }
});

exports.getAssetss = factory.getAll(createAssetsnModel)
exports.getAssets = factory.getOne(createAssetsnModel)
exports.updateAssets = factory.updateOne(createAssetsnModel);
exports.deleteAssets = factory.deleteOne(createAssetsnModel);
