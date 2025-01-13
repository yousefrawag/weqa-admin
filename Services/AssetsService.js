const expressAsyncHandler = require("express-async-handler");
const createMainCategoryModel = require("../Models/createMainCategoryAssets");
const factory = require("./FactoryHandler");
const createAssetsnModel = require("../Models/createAssets");
const createLocationModel = require("../Models/createLocation");

exports.createAssets = expressAsyncHandler(async (req, res, next) => {
  const { name, category, subCategory, room } = req.body;

  // إنشاء نموذج الأصول
  const assetsModel = new createAssetsnModel({
    name: name,
    category,
    subCategory: subCategory,
    room,
    location: req.params.id,
  });
  const roomAsset = await createLocationModel.findOne({
    "floors.areas.sections.rooms._id": room,
  });
  const mainCategoryAssets = await createMainCategoryModel.findById(category);
  if (!roomAsset) {
    return res.status(404).json({ msg: "Room Location not found" });
  }
  if (!mainCategoryAssets) {
    return res.status(404).json({ msg: "mainCategoryAssets not found" });
  }

  let roomFound = null;
  for (const floor of roomAsset.floors) {
    for (const area of floor.areas) {
      for (const section of area.sections) {
        const roomDoc = section.rooms.find(
          (roomitem) => roomitem._id.toString() === room.toString()
        );

        if (roomDoc) {
          roomFound = roomDoc;
          break;
        }
      }
    }
  }
  if (!roomFound) {
    return res.status(404).json({ msg: "Room not found" });
  }
  roomFound.assets.push(mainCategoryAssets._id);
  mainCategoryAssets.location = roomAsset._id;
  await roomAsset.save();
  await mainCategoryAssets.save();
  await assetsModel.save();

  // إرجاع الاستجابة بنجاح
  res.status(201).json({ status: "Success", data: assetsModel });
});

exports.getAssetss = expressAsyncHandler(async (req, res, next) => {
  const mainCategoriesAssets = await createAssetsnModel
    .find()
    .populate({
      path: "category",
      select: "name ",
    })
    .populate("location");
  return res.json({ status: "Success", data: mainCategoriesAssets });
});
exports.getAssets = expressAsyncHandler(async (req, res, next) => {
  const mainCategoriesAssets = await createAssetsnModel
    .findById(req.params.id)
    .populate({
      path: "category", // تعبئة الـ category
      select: "name", // تحديد الحقول التي ترغب في تعبئتها من الـ category
    })
    .populate({
      path: "location", // تعبئة الـ location
      select: "name kind floors", // تحديد الحقول التي تريدها من الـ location
      populate: {
        path: "floors.areas.sections.rooms", // تعبئة الغرف داخل الـ location
        select: "name assets", // تعبئة الغرف مع الأصول الخاصة بها
      },
    });

  // تحديث الغرف في الـ location
  mainCategoriesAssets.location.floors.forEach((floor) => {
    floor.areas.forEach((area) => {
      area.sections.forEach((section) => {
        section.rooms = section.rooms.filter(
          (room) => room._id.toString() === mainCategoriesAssets.room.toString()
        );
      });
    });
  });

  // تحقق من وجود الـ asset
  if (!mainCategoriesAssets) {
    return res.status(404).json({ message: "Asset not found" });
  }

  return res.json({
    status: "Success",
    data: mainCategoriesAssets,
  });
});

exports.updateAssets = factory.updateOne(createAssetsnModel);
exports.deleteAssets = factory.deleteOne(createAssetsnModel);
