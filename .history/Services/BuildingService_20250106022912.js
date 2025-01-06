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
  const levelsModel = continued === "first" ? "maincategories" :
  continued === "second" ? "categories" :
  continued === "third" ? "subcategories" :
  continued === "fourth" ? "nestsubcategories" :
  "subnestsubcategories";
  const building = new createBuildingModel({
    name,
    kind,
    levels,
    continued,
    levelsModel,
  });

  try {
    await building.save();

    if (continued === "first") {
      await createMainCategoryModel.findByIdAndUpdate(levels, {
        $push: { building: building._id },
      });
    } else if (continued === "second") {
      await createCategoryModel.findByIdAndUpdate(levels, {
        $push: { building: building._id },
      });
    } else if (continued === "third") {
      await createSubCategoryModel.findByIdAndUpdate(levels, {
        $push: { building: building._id },
      });
    } else if (continued === "fourth") {
      await createNestSubCategoryModel.findByIdAndUpdate(levels, {
        $push: { building: building._id },
      });
    } else if (continued === "fifth") {
      await createSubNestSubCategoryModel.findByIdAndUpdate(levels, {
        $push: { building: building._id },
      });
    } else {
      return res.status(404).json({ msg: "Not Found Levels" });
    }

    res.status(201).json({ status: "Success", data: building });
  } catch (error) {
    res.status(500).json({ msg: "Internal Server Error" });
  }
});

exports.getbuildings =expressAsyncHandler(async(req , res , next)=>{
 await createBuildingModel.find().populate("levels").populate("buildings")
}) 
exports.getBuilding = factory.getOne(createBuildingModel);
exports.updateBuilding = factory.updateOne(createBuildingModel);
exports.deleteBuilding = factory.deleteOne(createBuildingModel);
