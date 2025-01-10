const expressAsyncHandler = require("express-async-handler");
const createMainCategoryAssetsModel = require("../Models/createMainCategoryAssets");
const factory = require("./FactoryHandler");
const createLocationModel = require("../Models/createLocation");

exports.createMainCategoryAssets = expressAsyncHandler(async (req, res) => {
  const { location, name } = req.body; // location هنا هو room._id

  const mainCategoryAssets = new createMainCategoryAssetsModel({
    name,
  });

  // البحث عن الغرفة في موقع معين
  const locationAsset = await createLocationModel.findOne({
    "floors.areas.sections.rooms._id": location,
  });

  if (!locationAsset) {
    return res.status(404).json({ msg: "Room Location not found" });
  }

  // البحث عن الغرفة وإضافة الأصول
  let roomFound = null;
  for (const floor of locationAsset.floors) {
    for (const area of floor.areas) {
      for (const section of area.sections) {
        const room = section.rooms.find(
          (room) => room._id.toString() === location
        );
        if (room) {
          roomFound = room;
          break;
        }
      }
    }
  }

  if (!roomFound) {
    return res.status(404).json({ msg: "Room not found" });
  }

  roomFound.assets.push(mainCategoryAssets._id);
  mainCategoryAssets.location = locationAsset._id;
  await mainCategoryAssets.save();
  await locationAsset.save();

  res.status(201).json({ status: "Success", data: mainCategoryAssets });
});

exports.getMainCategoriesAssets = factory.getAll(createMainCategoryAssetsModel);
exports.getMainCategoryAsset = factory.getOne(createMainCategoryAssetsModel);
exports.updateMainCategoryAssets = factory.updateOne(
  createMainCategoryAssetsModel
);
exports.deleteMainCategoryAssets = factory.deleteOne(
  createMainCategoryAssetsModel
);

exports.getRoomForAssetLocation = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;

  // البحث عن الأصل الرئيسي وتعبئة الغرف
  const asset = await createMainCategoryAssetsModel.findById(id).populate({
    path: "location",
    populate: {
      path: "floors.areas.sections.rooms",
      select: "name assets",  // إرجاع الاسم فقط مع الأصول
    },
  });

  if (!asset || !asset.location) {
    return res.status(404).json({ msg: "Asset or location not found" });
  }


  let roomWithAsset = null;
  let hierarchy = {};  // لاحتواء التسلسل الهرمي

  // البحث في التسلسل الهرمي للغرف
  asset.location.floors.some((floor) =>
    floor.areas.some((area) =>
      area.sections.some((section) =>
        section.rooms.some((room) => {
          const hasAsset = room.assets.some(
            (roomAsset) => roomAsset._id.toString() === id
          );
          if (hasAsset) {
            roomWithAsset = room;
            hierarchy = {
              asset:asset.name,
              building: asset.location.building.name,
              floor: floor.floorName,
              area: area.name,
              section: section.name,
              room: room.name,
            };
            return true;
          }
          return false;
        })
      )
    )
  );

  if (!roomWithAsset) {
    return res.status(404).json({ msg: "Room not found for this asset" });
  }

  res.status(200).json({
    status: "Success",
    room:  hierarchy,
  });
});

