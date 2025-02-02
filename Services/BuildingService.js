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
  const building = await createBuildingModel
    .find({})
    .populate("levels") // تعبئة الحقل levels
    .populate({
      path: "location",
      select: { building: 0 },
    });

  res.status(201).json({ status: "Success", data: building });
});
exports.getBuilding = expressAsyncHandler(async (req, res, next) => {
  const building = await createBuildingModel
    .findById(req.params.id)
    .populate("levels")
    .populate({
      path: "location",
      select: { building: 0 },
    });

  if (!building) {
    return res.status(404).json({ msg: "Building not found" });
  }

  let relatedBuildings = [];

  // Function to recursively fetch related buildings UNDER the current level
  const fetchRelatedBuildings = async (levelId, levelsModel) => {
    let buildings = [];

    // Fetch buildings under sub-levels (exclude buildings at the same level)
    switch (levelsModel) {
      case "maincategories":
        const mainCategory = await createMainCategoryModel
          .findById(levelId)
          .populate("categories");
        for (const category of mainCategory.categories) {
          buildings.push(...(await fetchRelatedBuildings(category._id, "categories")));
        }
        break;

      case "categories":
        const category = await createCategoryModel
          .findById(levelId)
          .populate("subcategories");
        for (const subcategory of category.subcategories) {
          buildings.push(...(await fetchRelatedBuildings(subcategory._id, "subcategories")));
        }
        break;

      case "subcategories":
        const subcategory = await createSubCategoryModel
          .findById(levelId)
          .populate("nestSubCategory");
        for (const nestSubCategory of subcategory.nestSubCategory) {
          buildings.push(...(await fetchRelatedBuildings(nestSubCategory._id, "nestsubcategories")));
        }
        break;

      case "nestsubcategories":
        const nestSubCategory = await createNestSubCategoryModel
          .findById(levelId)
          .populate("subnestsubcategories");
        for (const subnestSubCategory of nestSubCategory.subnestsubcategories) {
          buildings.push(...(await fetchRelatedBuildings(subnestSubCategory._id, "subnestsubcategories")));
        }
        break;

      default:
        break;
    }

    // Fetch buildings directly under the current level (exclude same level)
    const subBuildings = await createBuildingModel.find({
      levelsModel: levelsModel,
      levels: levelId,
      _id: { $ne: building._id }, // Exclude the current building
    });

    buildings.push(...subBuildings);

    return buildings;
  };

  // Start fetching related buildings UNDER the current building's level
  relatedBuildings = await fetchRelatedBuildings(building.levels, building.levelsModel);

  // Remove duplicates
  relatedBuildings = [
    ...new Set(
      relatedBuildings
        .map(b => b._id.toString())
        .filter((item) => {
          // Ensure the item is not at the same level as the current building
          return item.levels !== building?.levels?._id.toString();
        })
    ),
  ];
  res.status(200).json({
    building,
    relatedBuildings: await createBuildingModel.find({
      _id: { $in: relatedBuildings },
    }),
  });
});
exports.updateBuilding = factory.updateOne(createBuildingModel);
exports.deleteBuilding = factory.deleteOne(createBuildingModel);


