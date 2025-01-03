const expressAsyncHandler = require("express-async-handler");

const factory = require("./FactoryHandler");
const createBuildingModel = require("../Models/createBuilding");


exports.createBuilding = expressAsyncHandler(async (req, res, next) => {
  const { maincategories, name } = req.body;

  const subBuilding = new createBuildingModel({
    name,
    kind,
    subcategories: [],
  });
  const parentBuilding = await createMainBuildingModel.findById(maincategories);
  if (!parentBuilding) {
    return res.status(404).json({ msg: "Not Found MainBuilding" });
  }

  parentBuilding.categories.push(subBuilding._id);

  try {
    await subBuilding.save();
    await parentBuilding.save();

    res.status(201).json({ status: "Success", data: subBuilding });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Internal Server Error" });
  }
});

exports.getBuildings = factory.getAll(createBuildingModel);
exports.getBuilding = factory.getOne(createBuildingModel);
exports.updateBuilding = factory.updateOne(createBuildingModel);
exports.deleteBuilding = factory.deleteOne(createBuildingModel);
