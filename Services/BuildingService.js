const expressAsyncHandler = require("express-async-handler");

const factory = require("./FactoryHandler");
const createBuildingModel = require("../Models/createBuilding");
const createMainCategoryModel = require("../Models/createMainCategory");
const createCategoryModel = require("../Models/createCategory");
const createSubCategoryModel = require("../Models/createSubCategory");
const createNestSubCategoryModel = require("../Models/createNestSubCategory");
const createSubNestSubCategoryModel = require("../Models/createSubNestSubCategory");
const createAssetsnModel = require("../Models/createAssets");
const { default: mongoose } = require("mongoose");
const createEmployeeModel = require("../Models/createEmployee");

exports.createBuilding = expressAsyncHandler(async (req, res, next) => {
  const { levels, kind, name, continued } = req.body;
  const levelsModel =
    continued === "first"
      ? "maincategories"
      : continued === "second"
      ? "categories"
      : continued === "third"
      ? "subcategories"
      : continued === "fourth"
      ? "nestsubcategories"
      : "subnestsubcategories";
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

exports.getbuildings = expressAsyncHandler(async (req, res, next) => {
  const query = req.user.building !== "all" 
  ? { building: req.user.building } 
  : {};
  const building = await createBuildingModel
    .find(query)
    .populate("levels") 
    .populate({
      path: "location"
    });

  res.status(201).json({ status: "Success", data: building });
});

exports.getBuilding = expressAsyncHandler(async (req, res, next) => {
  const building = await createBuildingModel
    .findById(req.params.id)
    .populate("levels")
    .populate({
      path: "location",
    });

  const assetsCount = await createAssetsnModel
    .find({ building: req.params.id })
    .countDocuments();
  const employeeCount = await createEmployeeModel
    .find({ building: req.params.id })
    .countDocuments();
  let relatedBuildings = [];

  if (building.levels?.maincategories) {
    const mainCategory = await createMainCategoryModel
      .findById(building.levels.maincategories)
      .populate({
        path: "categories",
        populate: {
          path: "subcategories",
        },
      });

    for (const category of mainCategory.categories) {
      const categoryBuildings = await createBuildingModel.find({
        levelsModel: "categories",
        levels: category._id,
      });
      const subcategoryBuildings = await createBuildingModel.find({
        levelsModel: "subcategories",
        levels: category._id,
      });
      const nestsubcategoryBuildings = await createBuildingModel.find({
        levelsModel: "nestsubcategories",
        levels: category._id,
      });
      const subnestsubcategoriesBuildings = await createBuildingModel.find({
        levelsModel: "subnestsubcategories",
        levels: category._id,
      });
      relatedBuildings.push(
        ...categoryBuildings,
        ...subcategoryBuildings,
        ...nestsubcategoryBuildings,
        ...subnestsubcategoriesBuildings
      );
    }
  }

  if (building.category) {
    const category = await createCategoryModel
      .findById(building.category)
      .populate("subcategories");
    const subcategoryBuildings = await createBuildingModel.find({
      subcategory: { $in: category.subcategories },
    });
    relatedBuildings.push(...subcategoryBuildings);
  }
  if (building.subcategory) {
    const subcategoryBuildings = await createBuildingModel.find({
      subcategory: building.subcategory,
    });
    relatedBuildings.push(...subcategoryBuildings);
  }

  relatedBuildings = [
    ...new Set(relatedBuildings.map((b) => b._id.toString())),
  ];

  res.status(200).json({
    building,
    assetsCount,
    employeeCount,
    relatedBuildings: await createBuildingModel.find({
      _id: { $in: relatedBuildings },
    }),
  });
});
exports.updateBuilding = factory.updateOne(createBuildingModel);
exports.deleteBuilding = factory.deleteOne(createBuildingModel);
