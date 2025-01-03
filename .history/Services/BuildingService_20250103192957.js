const expressAsyncHandler = require("express-async-handler");

const factory = require("./FactoryHandler");
const createBuildingModel = require("../Models/createBuilding");
const createMainCategoryModel = require("../Models/createMainCategory");
const createCategoryModel = require("../Models/createCategory");
const createSubCategoryModel = require("../Models/createSubCategory");
const createNestSubCategoryModel = require("../Models/createNestSubCategory");
const createSubNestSubCategoryModel = require("../Models/createSubNestSubCategory");

exports.createBuilding = expressAsyncHandler(async (req, res, next) => {
  const { levels, kind, name, continued } = req.body;

  const building = new createBuildingModel({
    name,
    kind,
    levels,
    continued,
  });

  try {
    await building.save();

    for (const level of levels) {
      if (continued === "first") {
        await createCategoryModel.findByIdAndUpdate(
          level.id,
          {
            building: building._id,
          },

          {
            new: true,
          }
        );
        await createMainCategoryModel.findByIdAndUpdate(level.id, {
          $push: { building: building._id },
        });
      } else if (continued === "second") {
        await createCategoryModel.findByIdAndUpdate(
          level.id,
          {
            building: building._id,
          },

          {
            new: true,
          }
        );
      } else if (continued === "third") {
        await createSubCategoryModel.findByIdAndUpdate(level.id, {
          $push: { building: building._id },
        });
      } else if (continued === "fourth") {
        await createNestSubCategoryModel.findByIdAndUpdate(level.id, {
          $push: { building: building._id },
        });
      } else if (continued === "fifth") {
        await createSubNestSubCategoryModel.findByIdAndUpdate(level.id, {
          $push: { building: building._id },
        });
      }
    }

    res.status(201).json({ status: "Success", data: building });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Internal Server Error" });
  }
});

exports.getbuildings = factory.getAll(createBuildingModel);
exports.getBuilding = factory.getOne(createBuildingModel);
exports.updateBuilding = factory.updateOne(createBuildingModel);
exports.deleteBuilding = factory.deleteOne(createBuildingModel);
