const expressAsyncHandler = require("express-async-handler");

const factory = require("./FactoryHandler");

const createMainCategoryModel = require("../Models/createMainCategory");
const createCategoryModel = require("../Models/createCategory");
const createSubCategoryModel = require("../Models/createSubCategory");
const createNestSubCategoryModel = require("../Models/createNestSubCategory");
const createSubNestSubCategoryModel = require("../Models/createSubNestSubCategory");

exports.createLocation = expressAsyncHandler(async (req, res, next) => {
  const { levels, kind, name, continued } = req.body;

  const Location = new createLoca({
    name,
    kind,
    levels,
    continued,
  });

  try {
    await Location.save();

    if (continued === "first") {
      await createMainCategoryModel.findByIdAndUpdate(levels, {
        $push: { Location: Location._id },
      });
    } else if (continued === "second") {
      await createCategoryModel.findByIdAndUpdate(levels, {
        $push: { Location: Location._id },
      });
    } else if (continued === "third") {
      await createSubCategoryModel.findByIdAndUpdate(levels, {
        $push: { Location: Location._id },
      });
    } else if (continued === "fourth") {
      await createNestSubCategoryModel.findByIdAndUpdate(levels, {
        $push: { Location: Location._id },
      });
    } else if (continued === "fifth") {
      await createSubNestSubCategoryModel.findByIdAndUpdate(levels, {
        $push: { Location: Location._id },
      });
    } else {
      return res.status(404).json({ msg: "Not Found Levels" });
    }

    res.status(201).json({ status: "Success", data: Location });
  } catch (error) {
    res.status(500).json({ msg: "Internal Server Error" });
  }
});

exports.getLocations = factory.getAll(createLocationModel);
exports.getLocation = factory.getOne(createLocationModel);
exports.updateLocation = factory.updateOne(createLocationModel);
exports.deleteLocation = factory.deleteOne(createLocationModel);
