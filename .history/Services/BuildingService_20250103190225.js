const expressAsyncHandler = require("express-async-handler");

const factory = require("./FactoryHandler");
const createBuildingModel = require("../Models/createBuilding");

const LevelModel1 = require("./models/Level1");
const LevelModel2 = require("./models/Level2");
const LevelModel3 = require("./models/Level3");
const LevelModel4 = require("./models/Level4");
const LevelModel5 = require("./models/Level5");
const createBuildingModel = require("./models/Building");

exports.createBuilding = expressAsyncHandler(async (req, res, next) => {
  const { levels, kind, name } = req.body;

  const subBuilding = new createBuildingModel({
    name,
    kind,
    levels,
  });

  try {
    // حفظ بيانات المبنى
    await subBuilding.save();

    for (const level of levels) {
      if (level.condition === "condition1") {
        await LevelModel1.findByIdAndUpdate(level.id, {
          $push: { buildings: subBuilding._id },
        });
      } else if (level.condition === "condition2") {
        await LevelModel2.findByIdAndUpdate(level.id, {
          $push: { buildings: subBuilding._id },
        });
      } else if (level.condition === "condition3") {
        await LevelModel3.findByIdAndUpdate(level.id, {
          $push: { buildings: subBuilding._id },
        });
      } else if (level.condition === "condition4") {
        await LevelModel4.findByIdAndUpdate(level.id, {
          $push: { buildings: subBuilding._id },
        });
      } else if (level.condition === "condition5") {
        await LevelModel5.findByIdAndUpdate(level.id, {
          $push: { buildings: subBuilding._id },
        });
      }
    }

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
